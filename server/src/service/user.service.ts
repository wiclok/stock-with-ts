import { User } from '../models/interface/user.interface';
import UserModel from '../models/user.model';

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
}

export default new UserService();
