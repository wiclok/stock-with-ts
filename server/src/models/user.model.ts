import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';
import { User } from './interface/user.interface';

class UserModel extends Model<User> implements User {
  public id!: number;
  public userName!: string;
  public email!: string;
  public password!: string;
  public role!: 'admin' | 'user';
  public state!: boolean;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
  },
  { sequelize, tableName: 'Users' },
);

export default UserModel;