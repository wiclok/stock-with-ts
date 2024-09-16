import { User } from "../models/interface/user.interface";
import UserModel from "../models/user.model";

class UserService {
  constructor() { }

  async getUserById(id: number): Promise<UserModel | null> {
    return await UserModel.findByPk(id);
  }

  async createUser(userData: User) {
    const createdUser = await UserModel.create(userData);

    return createdUser
  }

  async getAllUsers(): Promise<UserModel[]> {
    return await UserModel.findAll();
  }

  async getUserByEmail(email: string): Promise<UserModel | null> {
    return await UserModel.findOne({ where: { email } });
  }

}

export default new UserService();