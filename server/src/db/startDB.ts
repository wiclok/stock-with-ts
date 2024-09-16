import { sequelize } from './connection';

export const startDB = async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Conectado a la base de datos');
      sequelize.sync({ force: false });
    })
    .catch((err) => {
      console.log(err);
    });
};
