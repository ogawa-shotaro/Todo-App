import express from "express";

import { RegisterUserController } from "../controllers/auth/RegisterUserController";
import { SessionController } from "../controllers/auth/SessionController";
import { authHandler } from "../middlewares/authHandler";
import { validator } from "../middlewares/validateHandler";
import { UserRepository } from "../repositories/users/UserRepository";
import { loginUserSchema } from "../schemas/auth/loginUserSchema";
import { registerUserSchema } from "../schemas/auth/registerUserSchema";

const authRouter = express.Router();

const userRepository = new UserRepository();
const userRegisterController = new RegisterUserController(userRepository);
const sessionController = new SessionController(userRepository);

authRouter
  .route("/register")
  .post(validator(registerUserSchema), (req, res, next) => {
    userRegisterController.register(req, res, next);
  });

authRouter
  .route("/login")
  .post(validator(loginUserSchema), (req, res, next) => {
    sessionController.login(req, res, next);
  });

authRouter.route("/refresh").post(authHandler, (req, res, next) => {
  sessionController.checkAndRefresh(req, res, next);
});

authRouter.route("/logout").post(authHandler, (req, res, next) => {
  sessionController.logout(res, next);
});

export default authRouter;
