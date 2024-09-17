import BranchModel from "../models/branch.model";
import { Branch } from "../models/interface/branch.interface";

class BranchService {
  constructor() { }

  async createBranch(branch: Branch): Promise<Branch> {
    const createdBranch = await BranchModel.create(branch)
    return createdBranch;
  }
  
  async getBranchById(id: number): Promise<Branch | null> {
    const branch = await BranchModel.findByPk(id)
    if(!branch) return null;

    return branch;
  }

  async getAllBranches(): Promise<Branch[]> {
    return await BranchModel.findAll();
  }

  async updateBranch(id: number, updateBranch: Branch): Promise<Branch | null> {
    const branch = await BranchModel.findByPk(id);
    if(!branch) return null;
    await branch.update(updateBranch);
    return branch;
  }

  async deleteBranch(id: number): Promise<number> {
    const deletedBranch = await BranchModel.destroy({ where: { id } });
    return deletedBranch;
  }

  async assignManagerToBranch(branchId: number, managerId: number): Promise<Branch | null> {
    const branch = await BranchModel.findByPk(branchId);
    if(!branch) return null;
    branch.managerId = managerId;
    await branch.save();
    return branch;
  }
}

export default new BranchService();