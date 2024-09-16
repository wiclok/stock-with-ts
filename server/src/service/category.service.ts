import CategoryModel from "../models/category.model";
import { Category } from "../models/interface/category.interface";

class categoryService {
  constructor () { }

  async getCategories() {
    return await CategoryModel.findAll();
  }

  async createCategory(category: Category) {
    const createdCategory = await CategoryModel.create(category)
    return createdCategory;
  }

  async deleteCategory(id: number): Promise<number> {
    const deletedUser = await CategoryModel.destroy({ where: { id } });
    return deletedUser;
  }

  async getCategoryById(id: number) {
    return await CategoryModel.findByPk(id);
  }

  async updateCategory(id: number, updatedCategory: Category): Promise<Category | null>{
    const category = await CategoryModel.findByPk(id);
    if (!category) return null;
    await category.update( updatedCategory );
    return category;
  }

}

export default new categoryService();