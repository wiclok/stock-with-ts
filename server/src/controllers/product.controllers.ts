import { Request, Response } from "express";
import productService from "../service/product.service";

class productController {
  constructor() {}

  public async createProduct(req: Request, res: Response) {
    try {
      const product = req.body;

      if (!product) {
        return res
          .status(400)
          .json({ message: "No se recibieron los datos del producto" });
      }

      const createdProduct = await productService.createProduct(product);

      if (!createdProduct) {
        return res
          .status(500)
          .json({ message: "No se pudo crear el producto" });
      }

      res.status(201).json(product);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();

      if (!products) {
        return res.status(404).json({ message: "No se encontraron productos" });
      }

      res.json(products);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async getProductById(req: Request, res: Response) {

    try {
      const productId = parseInt(req.params.id);

      if(!productId) {
        return res.status(400).json({ message: 'ID invalido' });
      }

      const product = await productService.getProductById(productId);

      if(!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.status(200).json(product)
    } catch (err:any) {
      res.status(500).json({ error: err.message })
    }

  }

  public async updateProduct(req: Request, res: Response) {

    try {
      const productId = parseInt(req.params.id)

      if(!productId) {
        return res.status(400).json({ message: 'ID invalido' });
      }

      const updatedProduct = await productService.updateProduct(productId, req.body);
      
      if(updatedProduct === null) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.status(200).json(updatedProduct);
    } catch (err:any) {
      res.status(500).json({ error: err.message })
    }

  }

  public async deleteProduct(req: Request, res: Response) {

    try {
      const productId = parseInt(req.params.id);

      if(!productId) {
        return res.status(400).json({ message: 'ID invalido' });
      }

      const deletedProduct = await productService.deleteProduct(productId);
      
      if(deletedProduct === null) {
        return res.status(404).json({ message: 'El producto no se a podido eliminar' });
      }

      res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (err:any) {
      res.status(500).json({ error: err.message })
    }

  }

  public async productToBranch(req: Request, res: Response) {
    try {
      const productId = parseInt(req.params.id);
      const branchId = parseInt(req.body.branchId);
      const quantity = parseInt(req.body.quantity);
      
      if(!productId ||!branchId) {
        return res.status(400).json({ message: 'ID de producto y/o sucursal invalidos' });
      }
      
      const productToBranch = await productService.productToBranch(productId, branchId, quantity);
      
      if(!productToBranch) {
        return res.status(404).json({ message: 'No se pudo agregar el producto a la sucursal' });
      }
      
      res.status(200).json({ message: 'Producto agregado a la sucursal con éxito' });
    } catch (err:any) {
      res.status(500).json({ error: err.message });
    }
  }

  public async productInBranch (req: Request, res: Response) {
    try {

      const { branchId } = req.params;

      if (!branchId) {
        return res.status(400).json({ message: 'Falta el ID de la sucursal' });
      }
  
      const productsInBranch = await productService.productInBranch(parseInt(branchId));
  
      if (!productsInBranch || productsInBranch.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos en la sucursal' });
      }
  
      res.status(200).json( productsInBranch );

    } catch (err:any) {
      res.status(500).json({ error: err.message })
    }
  }

  public async countProducts(req: Request, res: Response) {
    try {
      const products = await productService.countProducts();

      if (!products) {
        return res.status(404).json({ message: "No se encontraron productos" });
      }

      res.status(200).json({ count: products });
    } catch (err:any) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new productController();
