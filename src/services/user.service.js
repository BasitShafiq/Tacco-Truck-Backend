
import db from '../models/index.js';
const { User } = db.db;

const create = async data => User.create(data);

const findOne = async (attribute, value) => {
  try {

    const user = await User.findOne({
      where: { [attribute]: value }
    });
    return user;
  } catch (error) {
    throw error;
  }
};


const update = async (userId, updatedUserData) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await user.update(updatedUserData);

    return user;
  } catch (error) {
    throw error;
  }
};
export {
  create,
  findOne,
  update
};
