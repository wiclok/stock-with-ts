import { Request, Response } from "express";
import { User } from "../models/interface/user.interface";
import authService from "../service/auth.service";
import { hashPassword } from "../util/hashString";
import { createJWT } from "../util/jsonWebToken";
import { comparePassword } from "../util/comparePassword";

class AuthController {
  constructor() { }

  public async registerUser(req: Request, res: Response){
    try {
      const user: User = req.body;

      const hashedPassword = await hashPassword(user.password)

      user.password =  hashedPassword;

      if(!user) {
        return res.status(400).send({ message: 'Datos del usuairo no encontrados' });
      }

      const newUser:User = await authService.createUser(user);

      if(!newUser) {
        return res.status(400).send({ message: 'Error al crear el usuario' });
      }

      const token = await createJWT({id: newUser.id as number})      

      res.status(201).json({ token: token})
    } catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  }

  public async loginUser(req: Request, res: Response){
    try {
      const user: User = req.body;

      const foundUser: User | null = await authService.getUserByEmail(user.email)
      
      if(!foundUser) {
        return res.status(401).send({ message: 'Credenciales inválidas' });
      }
      
      const isPasswordValid = await comparePassword(user.password, foundUser.password);
      
      if(!isPasswordValid) {
        return res.status(401).send({ message: 'Credenciales inválidas' });
      }
      
      const token = await createJWT({id: foundUser.id as number})
      
      res.json({ token: token})
    } catch (err:any) {
      res.status(500).send({ message: err.message });
    }
  }
}

export default new AuthController();