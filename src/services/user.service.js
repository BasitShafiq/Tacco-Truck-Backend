
import db from '../models/index.js';
const { User, Skill } = db.db;

const create = async data => User.create(data);

export {
  create,
};
