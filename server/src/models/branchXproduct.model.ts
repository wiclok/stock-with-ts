import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/connection";

class branchXproductModel extends Model {
  public id!: number;
  public productId!: number;
  public branchId!: number;
  public quantity!: number;
}

branchXproductModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: "branchXproducts" }
)

export default branchXproductModel;