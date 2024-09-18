import { SECRET } from '../config/environments';
import { User } from '../models/interface/user.interface';
import UserModel from '../models/user.model';
import jwt from 'jsonwebtoken';

class UserService {
  constructor() {}

  async createUser(user: User): Promise<User> {
    const newUser = await UserModel.create(user);
    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await UserModel.findAll();
    return users;
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await UserModel.findByPk(id);
    return user;
  }

  async updateUser(id: number, updatedUser: User): Promise<User | null> {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    await user.update(updatedUser);
    return user;
  }

  async deleteUser(id: number): Promise<number> {
    const deletedUser = await UserModel.destroy({ where: { id } });
    return deletedUser;
  }

  public async getUserWithToken(token: string) {
    try {
      const decodedToken = jwt.verify(token, SECRET) as any;
      const userId = decodedToken.id; 

      const user = await UserModel.findByPk(userId);
      return user;
    } catch (err) {
      throw new Error('Token inválido o usuario no encontrado');
    }
  }
}

export default new UserService();
