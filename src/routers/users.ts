import express from "express";

import { RegisterUserController } from "../controllers/users/RegisterUserController";
import { validator } from "../middlewares/validateHandler";
import { UserRepository } from "../repositories/users/UserRepository";
import { registerUserSchema } from "../schemas/users/registerUserSchema";

const userRouter = express.Router();

const userRepository = new UserRepository();
const userRegisterController = new RegisterUserController(userRepository);

userRouter
  .route("/register")
  .post(validator(registerUserSchema), (req, res, next) => {
    userRegisterController.register(req, res, next);
  });

export default userRouter;
