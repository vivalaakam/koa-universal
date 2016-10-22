import Sequelize from 'sequelize';
import configFull from './../../config/config.json';

const env = process.env.NODE_ENV || 'development';
const config = configFull[env];
let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

export {
  sequelize, Sequelize
};
