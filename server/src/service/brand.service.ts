import BrandModel from "../models/brand.model";
import { Brand } from "../models/interface/brand.interface";

class brandService {
  constructor () { }

  async getBrands() {
    return await BrandModel.findAll();
  }

  async createBrand(brand: Brand) {
    const createdBrand = await BrandModel.create(brand)
    return createdBrand;
  }

  async deleteBrand(id: number): Promise<number> {
    const deletedBrand = await BrandModel.destroy({ where: { id } });
    return deletedBrand;
  }

  async getBrandById(id: number): Promise<Brand | null>{
    return await BrandModel.findByPk(id);
  }

  async updateBrand(id: number, newBrand: Brand): Promise<Brand | null> {
    const brand = await BrandModel.findByPk(id);
    if (!brand) return null;
    await brand.update( newBrand );
    return brand;
  }

}

export default new brandService();