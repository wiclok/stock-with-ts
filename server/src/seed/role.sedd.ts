import RoleModel from '../models/role.model';

// Función para precargar los roles
export const seedRoles = async () => {
  try {
    const roles = ['Admin', 'Branch Manager', 'auditor'];

    for (const roleName of roles) {
      const role = await RoleModel.findOne({ where: { roleName } });
      if (!role) {
        await RoleModel.create({ roleName });
        console.log(`Role ${roleName} creado`);
      }
    }
  } catch (error) {
    console.error('Error al precargar los roles:', error);
  }
};
