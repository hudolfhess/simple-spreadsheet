import { PrismaClient as PrismaPostgresClient } from "@prisma/postgresql";

const PostgresClient = new PrismaPostgresClient();

export { PostgresClient };
