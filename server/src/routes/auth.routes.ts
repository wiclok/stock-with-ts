import { Router, Request, Response } from "express";
import authControllers from "../controllers/auth.controllers";

export const authRouter = Router();


authRouter.post('/register', authControllers.registerUser)
authRouter.post('/login', authControllers.loginUser)
