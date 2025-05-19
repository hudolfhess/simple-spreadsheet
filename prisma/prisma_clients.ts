import { PrismaClient as PrismaPostgresClient } from "@prisma/postgresql";
import { PrismaClient as PrismaMongoClient } from "@prisma/mongodb";

const PostgresClient = new PrismaPostgresClient();
const MongoClient = new PrismaMongoClient();

export { PostgresClient, MongoClient };
