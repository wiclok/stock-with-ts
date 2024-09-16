import { Dialect, Sequelize } from 'sequelize'
import { DB_DIALECT, DB_HOST, DB_NAME, DB_PASS, DB_USER } from '../config/environments';

// Crear una instancia de Sequelize
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT as Dialect,
});