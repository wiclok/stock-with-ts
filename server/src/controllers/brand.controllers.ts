import { Request, Response } from "express";
import brandService from "../service/brand.service";

class brandControllers {
  constructor () { }

  public async createBrand(req: Request, res: Response) {
    try {
      const brand = req.body;

      if(!brand) {
        return res.status(400).json({ message: 'No se recibio la marca' });
      }

      const createdBrand = await brandService.createBrand(brand);
      
      if(!createdBrand) {
        return res.status(500).json({ message: 'No se pudo crear la marca' });
      }

      res.status(201).json(createdBrand);

    } catch (err:any) {
      res.status(500).json({ message: err.message });
    }
  };

  public async getAllBrands(req: Request, res: Response) {
    try {
      const brands = await brandService.getBrands();
      if (brands.length === 0) {
        return res.status(404).json({ message: 'No se encontraron marcas' });
      }
      
      res.json(brands);
    } catch (err:any) {
      res.status(500).json({ message: err.message });
    }
  };

  public async getBrandById(req: Request, res: Response) {
    try {
      const brandId = parseInt(req.params.id);
      if (!brandId) {
        return res.status(400).json({ message: 'ID invalido' });
      }
      const brand = await brandService.getBrandById(brandId);
      if (brand === null) {
        return res.status(404).json({ message: 'Marca no encontrada' });
      }

      res.json(brand);
    } catch (err:any) {
      res.status(500).json({ message: err.message });
    }
  };

  public async updateBrandById(req: Request, res: Response) {
    try {
      const brandId = parseInt(req.params.id);
      if (!brandId) {
        return res.status(400).json({ message: 'ID invalido' });
      }
      const brand = req.body;
      const updatedBrand = await brandService.updateBrand(brandId, brand);
      if (updatedBrand === null) {
        return res.status(404).json({ message: 'Marca no encontrada' });
      }
      res.json(updatedBrand);
    } catch (err:any) {
      res.status(500).json({ message: err.message });
    }
  };
  
  public async deleteBrandById(req: Request, res: Response) {
    try {
      const brandId = parseInt(req.params.id);
      if (!brandId) {
        return res.status(400).json({ message: 'ID invalido' });
      }
      const deletedBrand = await brandService.deleteBrand(brandId);
      if (deletedBrand === null) {
        return res.status(500).json({ message: 'No se pudo eliminar la marca' });
      }
      res.status(200).json({ message: 'Categoria eliminada con exito' });
    } catch (err:any) {
      res.status(500).json({ message: err.message });
    }
  };
}

export default new brandControllers();