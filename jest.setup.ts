import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";

dotenv.config({ path: "./.env.test" });

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
  await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
});

beforeEach(async () => {
  await prisma.$executeRaw`ALTER SEQUENCE "Todo_id_seq" RESTART WITH 1`;
  await resetDatabase();
});

afterAll(async () => {
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

async function resetDatabase() {
  await prisma.todo.deleteMany();
}
