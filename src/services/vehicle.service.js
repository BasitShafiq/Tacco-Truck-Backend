
import db from '../models/index.js';
const { Vehicle } = db.db;

const create = async data => Vehicle.create(data);

export {
  create,
};
