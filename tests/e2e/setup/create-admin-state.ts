import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { testUtils } from "better-auth/plugins";

import { prisma } from "../../../src/lib/prisma";

const baseURL = process.env.BETTER_AUTH_URL;
const secret = process.env.BETTER_AUTH_SECRET;

if (!baseURL) {
  throw new Error("BETTER_AUTH_URL est obligatoire pour les tests E2E.");
}

if (!secret) {
  throw new Error("BETTER_AUTH_SECRET est obligatoire pour les tests E2E.");
}

const adminEmail = process.env.ADMIN_EMAILS?.split(",")
  .map((email) => email.trim().toLowerCase())
  .find(Boolean);

if (!adminEmail) {
  throw new Error("ADMIN_EMAILS est obligatoire pour les tests E2E.");
}

const auth = betterAuth({
  baseURL,
  secret,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  plugins: [testUtils()],
});

const main = async () => {
  const context = await auth.$context;
  const helpers = context.test;

  await prisma.user.deleteMany({
    where: {
      email: adminEmail,
    },
  });

  const user = helpers.createUser({
    email: adminEmail,
    name: "Admin E2E",
    emailVerified: true,
  });

  await helpers.saveUser(user);

  const cookies = await helpers.getCookies({
    userId: user.id,
    domain: new URL(baseURL).hostname,
  });

  const storageStatePath = resolve("playwright/.auth/admin.json");

  await mkdir(dirname(storageStatePath), {
    recursive: true,
  });

  await writeFile(
    storageStatePath,
    JSON.stringify(
      {
        cookies,
        origins: [],
      },
      null,
      2,
    ),
  );

  console.log(`Session E2E créée pour ${adminEmail}.`);
};

main()
  .catch((error) => {
    console.error("Impossible de créer la session admin E2E :", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
