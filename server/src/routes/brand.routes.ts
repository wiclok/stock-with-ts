import { Router } from "express";
import brandControllers from "../controllers/brand.controllers";

export const brandRouter = Router();

brandRouter.post('/', brandControllers.createBrand)
brandRouter.get('/', brandControllers.getAllBrands)
brandRouter.get('/:id', brandControllers.getBrandById)
brandRouter.delete('/:id', brandControllers.deleteBrandById)
brandRouter.put('/:id', brandControllers.updateBrandById)