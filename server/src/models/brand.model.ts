import { Model, DataTypes } from "sequelize";
import { Brand } from "./interface/brand.interface";
import { sequelize } from "../db/connection";

class BrandModel extends Model<Brand> implements Brand {
  public id!: number;
  public name!: string;
  public description?: string;
}

BrandModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  { sequelize, tableName: 'Brands' }
)

export default BrandModel;