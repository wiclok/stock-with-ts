import { Request, Response } from 'express';
import { User } from '../models/interface/user.interface';
import userService from '../service/user.service';

class UserController {
  constructor() {}

  public async createUser(req: Request, res: Response) {
    try {
      const user: User = req.body;

      if (!user) {
        return res.status(400).json({ message: 'Datos del usario no recibidos.' });
      }

      const createdUser = await userService.createUser(user);

      if (!createdUser) {
        return res.status(400).json({ message: 'Error en la creación del usuario' });
      }

      res.status(201).json(createdUser);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      if (users.length === 0) {
        return res.status(404).json({ message: 'No existen usuarios' });
      }
      res.status(200).json(users);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      if (!userId) {
        return res.status(400).json({ message: 'ID invalido' });
      }
      const user = await userService.getUserById(userId);
      if (user === null) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      if (!userId) {
        return res.status(400).json({ message: 'ID invalido' });
      }
      const updatedUser = await userService.updateUser(userId, req.body);
      if (updatedUser === null) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(updatedUser);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      if (!userId) {
        return res.status(400).json({ message: 'ID invalido' });
      }

      const userFound = await userService.getUserById(userId);
      if (userFound === null) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const deletedUser = await userService.deleteUser(userId);
      if (deletedUser === null) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario eliminado con exito' });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new UserController();