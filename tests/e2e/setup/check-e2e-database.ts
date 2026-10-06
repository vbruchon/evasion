const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL est obligatoire pour exécuter les tests E2E.");
}

const databaseName = new URL(databaseUrl).pathname.replace("/", "");

if (!databaseName.endsWith("_e2e")) {
  throw new Error(
    `Les tests E2E refusent d'utiliser la base "${databaseName}". ` +
      'DATABASE_URL doit pointer vers une base se terminant par "_e2e".',
  );
}

console.log(`Base E2E vérifiée : ${databaseName}`);
