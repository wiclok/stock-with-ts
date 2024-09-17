import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';

class RoleModel extends Model {
  public id!: number;
  public roleName!: string;
}

RoleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, tableName: 'Roles' }
);

export default RoleModel;
