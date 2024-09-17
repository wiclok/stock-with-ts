import { Request, Response } from "express";
import branchService from "../service/branch.service";
import userService from "../service/user.service";

class branchController {
  constructor () { }

  public createBranch = async (req: Request, res: Response) => {
    try {
      const branch = req.body;

      if(!branch) {
        return res.status(400).json({ message: 'No se recibió la información de la sucursal.' });
      }
  
      const newBranch = await branchService.createBranch(branch);

      if(!newBranch) {
        return res.status(400).json({ message: 'Error en la creación de la sucursal.' });
      }

      res.status(201).json({ message: 'Sucursal creada con éxito'});
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la sucursal', error });
    }
  };

  public updateBranch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateBranch = req.body;
  
      const branch = await branchService.getBranchById(parseInt(id))

      if (!branch) {
        return res.status(404).json({ message: 'Sucursal no encontrada' });
      }
  
      const branchUpdated = await branchService.updateBranch(parseInt(id), updateBranch);

      if(branchUpdated === null) {
        return res.status(400).json({ message: 'Error en la actualización de la sucursal' });
      }

      res.status(200).json({ message: 'Sucursal actualizada con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la sucursal', error });
    }
  };

  public getAllBranches = async (req: Request, res: Response) => {
    try {

      const branches = await branchService.getAllBranches();

      if(!branches) {
        res.status(404).json({ message: 'No se encontraron sucursales' });
      }

      res.status(200).json(branches);

    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public deleteBranch = async (req: Request, res: Response) => {
    try {
      const branchId = parseInt(req.params.id);

      if(!branchId){
        res.status(404).json({ message: 'No se proporcionó el id de la sucursal' })
      }

      const branch = await branchService.getBranchById(branchId);
      
      if(!branch) {
        res.status(404).json({ message: 'Sucursal no encontrada' });
      }

      const deletedBranch = await branchService.deleteBranch(branchId);
      
      if(!deletedBranch) {
        return res.status(404).json({ message: 'Sucursal no encontrada' });
      }
      
      res.status(200).json({ message: 'Sucursal eliminada con éxito' });

    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  public assignManagerToBranch = async (req: Request, res: Response) => {
    try {
      const { branchId, managerId } = req.body;

      if (!branchId ||!managerId) {
        return res.status(400).json({ message: 'Faltan datos para la operación' });
      }

      const manager = await userService.getUserById(managerId);

      if(manager?.roleId !== 2) {
        return res.status(400).json({ message: 'El usuario seleccionado no es gerente' });
      }

      const branch = await branchService.getBranchById(branchId);
      if (!branch) {
        return res.status(404).json({ message: 'Sucursal no encontrada' });
      }
  
      const branchUpdated = await branchService.assignManagerToBranch(branchId, managerId);

      if (branchUpdated === null) {
        return res.status(400).json({ message: 'Error al asignar gerente a la sucursal' });
      }
  
      res.status(200).json({ message: 'Gerente asignado con éxito', branch });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new branchController()