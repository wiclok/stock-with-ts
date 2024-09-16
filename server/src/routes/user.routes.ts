import { Router } from "express";
import userControllers from "../controllers/user.controllers";

export const userRouter = Router();

userRouter.post('/', userControllers.createUser);
userRouter.get('/', userControllers.getAllUsers);
userRouter.get('/:id', userControllers.getUserById);
userRouter.put('/:id', userControllers.updateUser);
userRouter.delete('/:id', userControllers.deleteUser);