import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';
import UserModel from './user.model';
import { Branch } from './interface/branch.interface';

class BranchModel extends Model<Branch> implements Branch {
  public id!: number;
  public branchName!: string;
  public location!: string;
  public managerId!: number;
}

BranchModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    managerId: {
      type: DataTypes.INTEGER,
      references: {
        model: UserModel,
        key: 'id',
      },
    },
  },
  { sequelize, tableName: 'Branches' }
);

export default BranchModel;
