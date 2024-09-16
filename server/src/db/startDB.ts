import { sequelize } from "./connection";

export const startDB = () => {
  sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a PostgreSQL establecida con éxito.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
}