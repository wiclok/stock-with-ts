import BranchModel from '../models/branch.model';
import branchXproductModel from '../models/branchXproduct.model';
import BrandModel from '../models/brand.model';
import CategoryModel from '../models/category.model';
import ProductModel from '../models/product.model';
import UserModel from '../models/user.model';

export const executeRelations = async () => {
  UserModel.hasMany(BranchModel, { foreignKey: 'managerId', as: 'branches' });
  BranchModel.belongsTo(UserModel, { foreignKey: 'managerId', as: 'manager' });

  BranchModel.belongsToMany(ProductModel, {
    through: branchXproductModel,
    foreignKey: 'BranchModelId',
    as: 'products',
  });
  ProductModel.belongsToMany(BranchModel, {
    through: branchXproductModel,
    foreignKey: 'ProductModelId',
    as: 'branches',
  });

  BrandModel.hasMany(ProductModel, { foreignKey: 'brandId', as: 'brand' });
  ProductModel.belongsTo(BrandModel, { foreignKey: 'brandId', as: 'brand' });

  ProductModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId',
    as: 'Category',
  });
  CategoryModel.hasMany(ProductModel, {
    foreignKey: 'categoryId',
    as: 'Products',
  });
};
