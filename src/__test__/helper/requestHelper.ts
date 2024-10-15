import jwt from "jsonwebtoken";
import request from "supertest";

import { PrismaClient, User } from "@prisma/client";

import app from "../../app";

const prisma = new PrismaClient();

export const createTestUser = async () => {
  const user: User = await prisma.user.create({
    data: {
      name: "ダミーユーザー",
      password: "dummyPassword",
      email: `dummyData${new Date()}@mail.com`,
    },
  });

  return user;
};

export const requestAPI = ({
  method,
  endPoint,
  statusCode,
}: {
  method: "get" | "post" | "put" | "delete";
  endPoint: string;
  statusCode: number;
}) => {
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
  user,
}: {
  method: "get" | "post" | "put" | "delete";
  endPoint: string;
  statusCode: number;
  user: User;
}) => {
  const userId = user.id;
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  const cookie = `token=${token}`;

  return requestAPI({ method, endPoint, statusCode }).set("Cookie", cookie);
};
