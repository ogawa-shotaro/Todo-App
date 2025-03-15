import express from "express";

import { RegisterUserController } from "../controllers/auth/RegisterUserController";
import { SessionUserController } from "../controllers/auth/SessionUserController";
import { authHandler } from "../middlewares/authHandler";
import { validator } from "../middlewares/validateHandler";
import { UserRepository } from "../repositories/users/UserRepository";
import { loginUserSchema } from "../schemas/users/loginUserSchema";
import { registerUserSchema } from "../schemas/users/registerUserSchema";

const authRouter = express.Router();

const userRepository = new UserRepository();
const userRegisterController = new RegisterUserController(userRepository);
const userSessionController = new SessionUserController(userRepository);

authRouter
  .route("/register")
  .post(validator(registerUserSchema), (req, res, next) => {
    userRegisterController.register(req, res, next);
  });

authRouter
  .route("/login")
  .post(validator(loginUserSchema), (req, res, next) => {
    userSessionController.login(req, res, next);
  });

authRouter.route("/refresh").post(authHandler, (req, res, next) => {
  userSessionController.checkAndRefresh(req, res, next);
});

authRouter.route("/logout").post(authHandler, (req, res, next) => {
  userSessionController.logout(res, next);
});

export default authRouter;
