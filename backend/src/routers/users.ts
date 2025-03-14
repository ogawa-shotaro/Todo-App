import express from "express";

import { DeleteUserController } from "../controllers/users/DeleteUserController";
import { RegisterUserController } from "../controllers/users/RegisterUserController";
import { SessionUserController } from "../controllers/users/SessionUserController";
import { UpdateUserController } from "../controllers/users/UpdateUserController";
import { authHandler } from "../middlewares/authHandler";
import { validator } from "../middlewares/validateHandler";
import { UserRepository } from "../repositories/users/UserRepository";
import { loginUserSchema } from "../schemas/users/loginUserSchema";
import { registerUserSchema } from "../schemas/users/registerUserSchema";
import { updateUserSchema } from "../schemas/users/updateUserSchema";

const userRouter = express.Router();

const userRepository = new UserRepository();
const userRegisterController = new RegisterUserController(userRepository);
const userSessionController = new SessionUserController(userRepository);
const userUpdateController = new UpdateUserController(userRepository);
const userDeleteUserController = new DeleteUserController(userRepository);

userRouter
  .route("/register")
  .post(validator(registerUserSchema), (req, res, next) => {
    userRegisterController.register(req, res, next);
  });

userRouter
  .route("/login")
  .post(validator(loginUserSchema), (req, res, next) => {
    userSessionController.login(req, res, next);
  });

userRouter.route("/reLogin").get(authHandler, (req, res, next) => {
  userSessionController.reLogin(req, res, next);
});

userRouter.route("/logout").post(authHandler, (req, res, next) => {
  userSessionController.logout(res, next);
});

userRouter
  .route("/")
  .put(authHandler, validator(updateUserSchema), (req, res, next) => {
    userUpdateController.update(req, res, next);
  })
  .delete(authHandler, (req, res, next) => {
    userDeleteUserController.delete(req, res, next);
  });

export default userRouter;
