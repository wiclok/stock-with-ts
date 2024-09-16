import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/connection";
import { Category } from "./interface/category.interface";

class CategoryModel extends Model<Category> implements Category {
  public id!: number;
  public name!: string;
}

CategoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  { sequelize, tableName: 'Categories' },
);

export default CategoryModel;