import express from "express";

import { LoginUserController } from "../controllers/users/LoginUserController";
import { RegisterUserController } from "../controllers/users/RegisterUserController";
import { validator } from "../middlewares/validateHandler";
import { UserRepository } from "../repositories/users/UserRepository";
import { loginUserSchema } from "../schemas/users/loginUserSchema";
import { registerUserSchema } from "../schemas/users/registerUserSchema";

const userRouter = express.Router();
const userRepository = new UserRepository();
const userRegisterController = new RegisterUserController(userRepository);
const userLoginController = new LoginUserController(userRepository);
userRouter
  .route("/register")
  .post(validator(registerUserSchema), (req, res, next) => {
    userRegisterController.register(req, res, next);
  });
userRouter
  .route("/login")
  .post(validator(loginUserSchema), (req, res, next) => {
    userLoginController.login(req, res, next);
  });
export default userRouter;
