import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";

dotenv.config({ path: "./.env.test" });

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  await resetDatabase();
});

afterAll(async () => {
  await resetDatabase();
  await prisma.$disconnect();
});

async function resetDatabase() {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();
}
