import { Router } from "express";
import productControllers from "../controllers/product.controllers";

export const productRouter = Router();

productRouter.post('/', productControllers.createProduct);
productRouter.get('/', productControllers.getAllProducts);
productRouter.get('/countProducts', productControllers.countProducts);
productRouter.get('/:id', productControllers.getProductById);
productRouter.put('/:id', productControllers.updateProduct);
productRouter.delete('/:id', productControllers.deleteProduct);
productRouter.post('/ProductToBranch/:id', productControllers.productToBranch);
productRouter.get('/ProductInBranch/:branchId', productControllers.productInBranch);