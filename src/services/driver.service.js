
import db from '../models/index.js';
const { Driver } = db.db;
const create = async data => Driver.create(data);
const findOne = async (email) => {
  try {
    const user = await User.findOne({
      where: { email: email }
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
