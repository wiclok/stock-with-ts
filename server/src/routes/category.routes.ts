import { Router } from "express";
import categoryControllers from "../controllers/category.controllers";

export const categoryRouter = Router();

categoryRouter.post('/', categoryControllers.createCategory);
categoryRouter.get('/', categoryControllers.getCategories);
categoryRouter.get('/:id', categoryControllers.getCategoryById)
categoryRouter.delete('/:id', categoryControllers.deleteCategoryById)
categoryRouter.put('/:id', categoryControllers.updateCategory)