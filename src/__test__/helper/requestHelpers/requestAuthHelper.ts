import jwt from "jsonwebtoken";

import { UserRepository } from "../../../repositories/UserRepository";

export const createTestUser = async (): Promise<string> => {
  const repository = new UserRepository();
  const userData = await repository.register({
    name: "ダミーユーザー",
    password: "dummyPassword",
    email: "dummyData@mail.com",
  });
  const userId = userData.user.id;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return `token=${token}`;
};
