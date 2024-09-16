import { Response, Request } from "express";
import { Category } from '../models/interface/category.interface'
import categoryService from "../service/category.service";

class categoryController {
  constructor() { }

  public async createCategory(req: Request, res: Response) {
    try {
      const category:Category = req.body;

      if(!category) {
        return res.status(400).json({ message: 'No se recibio la categoria' });
      }

      const createdCategory:Category = await categoryService.createCategory(category);

      if(!createdCategory) {
        return res.status(500).json({ message: 'No se pudo crear la categoria' });
      }

      res.status(201).json(createdCategory);
    } catch (err:any) {
      res.status(500).json({ message: err.message });      
    }
  }

  public async getCategories(req: Request, res: Response) {
    try {
      const categories:Category[] = await categoryService.getCategories();
      res.json(categories);
    } catch (err:any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async getCategoryById(req: Request, res: Response) {
    try {
      const category:Category | null = await categoryService.getCategoryById(parseInt(req.params.id));
      
      if(!category) {
        return res.status(404).json({ message: 'No se encontró la categoria' });
      }
      
      res.json(category);
      
    } catch (err:any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async deleteCategoryById(req: Request, res: Response) {
    try {
      
      const categoryFound = await categoryService.getCategoryById(parseInt(req.params.id));
      
      if(!categoryFound) {
        return res.status(404).json({ message: 'No se encontró la categoria' });
      }

      const deletedCategory = await categoryService.deleteCategory(parseInt(req.params.id))

      if(deletedCategory === null) {
        return res.status(500).json({ message: 'No se pudo eliminar la categoria' });
      }

      res.status(200).json({ message: 'Categoria eliminada con exito' });

    } catch (err:any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async updateCategory(req: Request, res: Response) {
    try {
      const categoryId: number = parseInt(req.params.id)

      if(!categoryId) {
        return res.status(400).json({ message: 'No se recibió el id de la categoria' });
      }

      const updatedCategory = await categoryService.updateCategory(categoryId, req.body);
      
      if(!updatedCategory) {
        return res.status(404).json({ message: 'No se encontró la categoria' });
      }
      
      res.json(updatedCategory);
      
    } catch (err:any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new categoryController();