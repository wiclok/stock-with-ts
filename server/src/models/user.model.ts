import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';
import RoleModel from './role.model';
import { User } from './interface/user.interface';
import BranchModel from './branch.model';

class UserModel extends Model<User> implements User {
  public id!: number;
  public userName!: string;
  public email!: string;
  public password!: string;
  public roleId!: number;
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
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: RoleModel,
        key: 'id',
      },
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize, tableName: 'Users' }
);

// Establecemos el hook para asignar el rol por defecto
UserModel.beforeCreate(async (user) => {
  if (!user.roleId) {
    const defaultRole = await RoleModel.findOne({ where: { roleName: 'auditor' } });
    if (defaultRole) {
      user.roleId = defaultRole.id;
    }
  }
});

export default UserModel;