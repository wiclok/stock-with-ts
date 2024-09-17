import { seedRoles } from '../seed/role.sedd';
import { sequelize } from './connection';
import { executeRelations } from './relations';

export const startDB = async () => {
  sequelize
    .authenticate()
    .then(() => {
      sequelize.sync({ force: false });
      executeRelations();
      seedRoles();
      console.log('Conectado a la base de datos');

    })
    .catch((err) => {
      console.log(err);
    });
};
