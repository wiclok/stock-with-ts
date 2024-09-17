import { Router } from "express";
import branchControllers from "../controllers/branch.controllers";

export const branchRouter = Router();

branchRouter.post('/', branchControllers.createBranch);
branchRouter.put('/:id', branchControllers.updateBranch);
branchRouter.get('/', branchControllers.getAllBranches);
branchRouter.delete('/:id', branchControllers.deleteBranch);
branchRouter.patch('/', branchControllers.assignManagerToBranch);