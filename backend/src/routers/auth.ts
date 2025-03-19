import express from "express";

import { RegisterController } from "../controllers/auths/RegisterController";
import { SessionController } from "../controllers/auths/SessionController";
import { authHandler } from "../middlewares/authHandler";
import { validator } from "../middlewares/validateHandler";
import { UserRepository } from "../repositories/users/UserRepository";
import { loginSchema } from "../schemas/auths/loginSchema";
import { registerSchema } from "../schemas/auths/registerSchema";

const authRouter = express.Router();

const userRepository = new UserRepository();
const registerController = new RegisterController(userRepository);
const sessionController = new SessionController(userRepository);

authRouter
  .route("/register")
  .post(validator(registerSchema), (req, res, next) => {
    registerController.register(req, res, next);
  });

authRouter.route("/login").post(validator(loginSchema), (req, res, next) => {
  sessionController.login(req, res, next);
});

authRouter.route("/refresh").post(authHandler, (req, res, next) => {
  sessionController.checkAndRefresh(req, res, next);
});

authRouter.route("/logout").post(authHandler, (req, res, next) => {
  sessionController.logout(res, next);
});

export default authRouter;
