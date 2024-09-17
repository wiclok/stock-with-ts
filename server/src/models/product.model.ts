import { Model, DataTypes } from "sequelize";
import { Product } from "./interface/product.interface";
import { sequelize } from "../db/connection";
import CategoryModel from "./category.model";

class ProductModel extends Model<Product> implements Product {
  public id!: number;
  public name!: string;
  public description?: string;
  public price!: number;
  public stock!: number;
  public imageUrl?: string;
  public categoryId!: number;
}

ProductModel.init(
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
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: CategoryModel,
        key: "id",
      },
    },
  },
  { sequelize, tableName: "Products" },
)

export default ProductModel;