import Sequelize from 'sequelize';
import configFull from './../../config/config.json';

const env = process.env.NODE_ENV || 'development';
const config = configFull[env];
const sequelize = process.env.DATABASE_URL ?
  new Sequelize(process.env.DATABASE_URL, config) :
  new Sequelize(config.database, config.username, config.password, config);

export {
  sequelize, Sequelize
};
