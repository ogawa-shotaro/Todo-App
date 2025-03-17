import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Prisma, PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";

import { hashPassword } from "../../auths/password_operator";
import { ConflictError } from "../../errors/ConflictError";
import { InternalServerError } from "../../errors/InternalServerError";
import { NotFoundError } from "../../errors/NotFoundError";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import type {
  UserLoginInput,
  UserRegisterInput,
} from "../../types/auths/AuthRequest.type";
import type {
  UserId,
  UserUpdateInput,
} from "../../types/users/UserRequest.type";

const prisma = new PrismaClient();

const createJWT = (userId: number) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return token;
};

export class UserRepository {
  async register(inputData: UserRegisterInput) {
    try {
      const hashedPassword = await hashPassword(inputData.password);
      const userData: User = await prisma.user.create({
        data: {
          name: inputData.name,
          password: hashedPassword,
          email: inputData.email,
        },
      });

      const token = createJWT(userData.id);

      return { user: userData, token };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictError("emailの内容が重複しています。");
      } else {
        throw new InternalServerError("データベースにエラーが発生しました。");
      }
    }
  }

  async login(inputData: UserLoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: inputData.email },
    });

    if (!user) {
      throw new NotFoundError("認証に失敗しました。");
    }

    const passwordMatches = await bcrypt.compare(
      inputData.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedError("認証に失敗しました。");
    }

    const token = createJWT(user.id);

    return { user, token };
  }

  async checkAndRefresh(userId: UserId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedError("認証に失敗しました。");
    }

    const token = createJWT(user.id);

    return { user, token };
  }

  async update(inputData: UserUpdateInput) {
    try {
      const updateItems: Partial<User> = {};

      if (inputData.name) {
        updateItems.name = inputData.name;
      }

      if (inputData.password) {
        const hashedPassword = await hashPassword(inputData.password);
        updateItems.password = hashedPassword;
      }

      if (inputData.email) {
        updateItems.email = inputData.email;
      }

      const updatedUser = await prisma.user.update({
        where: { id: inputData.userId },
        data: updateItems,
      });

      return updatedUser;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictError("emailの内容が重複しています。");
      } else {
        throw new InternalServerError("データベースにエラーが発生しました。");
      }
    }
  }

  async delete(userId: UserId) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: userId },
      });

      return deletedUser;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError("削除対象のユーザーが見つかりません。");
      } else {
        throw new InternalServerError("データベースにエラーが発生しました。");
      }
    }
  }
}
