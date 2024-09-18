import BranchModel from "../models/branch.model";
import branchXproductModel from "../models/branchXproduct.model";
import CategoryModel from "../models/category.model";
import { Product } from "../models/interface/product.interface";
import ProductModel from "../models/product.model";

class productService {
  constructor () { }

  async createProduct(product: Product): Promise<Product> {
    const newProduct = ProductModel.create(product);
    return newProduct;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await ProductModel.findAll({
      include: [
        {
          model: CategoryModel,
          as: 'Category',
          attributes: ['name'],
        },
      ],
    });
  
    return products;
  }
  

  async getProductById(id: number): Promise<Product | null> {
    const product = await ProductModel.findByPk(id);
    return product;
  }

  async updateProduct(id: number, updatedProduct: Product): Promise<Product | null> {
    const product = await ProductModel.findByPk(id);
    if (!product) return null;
    await product.update(updatedProduct);
    return product;
  
  }

  async deleteProduct(id: number): Promise<number> {
    const deletedProduct = await ProductModel.destroy({ where: { id } });
    return deletedProduct;
  }

  async productToBranch(productId: number, branchId: number, quantity: number) {
    const existingAssociation = await branchXproductModel.findOne({
      where: { ProductModelId: productId, BranchModelId: branchId },
    });

    console.log(productId, branchId)
    if (existingAssociation) {

      existingAssociation.quantity += quantity;
      await existingAssociation.save();
      return existingAssociation;
    } else {

      const newAssociation = await branchXproductModel.create({
        ProductModelId: productId,
        BranchModelId: branchId,
        quantity,
      });
      return newAssociation;
    }
  }

  async productInBranch(branchId: number) {
    const products = await BranchModel.findAll({
      where: { id: branchId },
      include: [
        {
          model: ProductModel,
          as: "products",
          attributes: ["name", "description", "price", "imageUrl", "categoryId"],
          through: { attributes: ["quantity"] },
        },
      ],
    });
  
    return products;
  }
  
  async countProducts() {
    const count = await ProductModel.count();
    return count;
  }
  

}

export default new productService();