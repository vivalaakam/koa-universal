import fs from 'fs';
import path from 'path';
import { sequelize, Sequelize } from './adapter';

const basename = path.basename(module.filename);
const ignoreFiles = [basename, 'adapter.js'];

const files = fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && ignoreFiles.indexOf(file) === -1 && (file.slice(-3) === '.js'));

const db = files.reduce((dbs, file) => {
  const { model } = sequelize.import(path.join(__dirname, file));
  dbs[model.name] = model;
  if (dbs[model.name].associate) {
    db[model.name].associate(db);
  }
  return dbs;
}, {});

module.export = {
  ...db, sequelize, Sequelize
};

