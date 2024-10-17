import jwt from "jsonwebtoken";
import request from "supertest";

import { PrismaClient } from "@prisma/client";

import app from "../../app";

const prisma = new PrismaClient();

type RequestAPIArg = {
  method: "get" | "post" | "put" | "delete";
  endPoint: string;
  statusCode: number;
};

export const createTestUser = async () => {
  const user = await prisma.user.create({
    data: {
      name: "ダミーユーザー",
      password: "dummyPassword",
      email: `dummyData${Date.now()}@mail.com`,
    },
  });
  return user;
};

export const requestAPI = ({ method, endPoint, statusCode }: RequestAPIArg) => {
  return request(app)
    [method](endPoint)
    .set("Accept", "application/json")
    .expect("Content-type", /application\/json/)
    .expect(statusCode);
};

export const requestAPIWithAuth = ({
  method,
  endPoint,
  statusCode,
  userId,
}: RequestAPIArg & { userId: number }) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  const cookie = `token=${token}`;

  return requestAPI({ method, endPoint, statusCode }).set("Cookie", cookie);
};
