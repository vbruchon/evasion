import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError } from "better-auth/api";
import { betterAuth } from "better-auth/minimal";

import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

const betterAuthUrl = process.env.BETTER_AUTH_URL;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!betterAuthUrl) {
  throw new Error("BETTER_AUTH_URL is not defined");
}

if (!googleClientId) {
  throw new Error("GOOGLE_CLIENT_ID is not defined");
}

if (!googleClientSecret) {
  throw new Error("GOOGLE_CLIENT_SECRET is not defined");
}

export const auth = betterAuth({
  baseURL: betterAuthUrl,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!isAdminEmail(user.email)) {
            throw new APIError("FORBIDDEN", {
              message: "Ce compte Google n’est pas autorisé.",
            });
          }

          return {
            data: {
              ...user,
              email: user.email.trim().toLowerCase(),
            },
          };
        },
      },
    },
  },

  socialProviders: {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
  },
});
