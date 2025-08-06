import express from "express";

import { DeleteUserController } from "../controllers/users/DeleteUserController";
import { UpdateUserController } from "../controllers/users/UpdateUserController";
import { authHandler } from "../middlewares/authHandler";
import { validator } from "../middlewares/validateHandler";
import { UserRepository } from "../repositories/users/UserRepository";
import { updateUserSchema } from "../schemas/users/updateUserSchema";

const userRouter = express.Router();

const userRepository = new UserRepository();
const userUpdateController = new UpdateUserController(userRepository);
const userDeleteUserController = new DeleteUserController(userRepository);

userRouter
  .route("/")
  .put(authHandler, validator(updateUserSchema), (req, res, next) => {
    userUpdateController.update(req, res, next);
  })
  .delete(authHandler, (req, res, next) => {
    userDeleteUserController.delete(req, res, next);
  });

export default userRouter;
