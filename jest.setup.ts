import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
dotenv.config({ path: "./.env.test" });

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  await resetDatabase();
});

async function resetDatabase() {
  await prisma.todo.deleteMany();
}

afterAll(async () => {
  await prisma.$disconnect();
});
