
import db from '../models/index.js';
const { Driver, User } = db.db;


const create = async (data, file) => {
  let t;
  try {
    const existingUser = await User.findOne({
      where: { email: data.email }
    });
    if (existingUser) {
      return { error: 'Email already exists' };
    }
    const sequelize = db.db.sequelize;
    t = await sequelize.transaction();
    const imageName = file ? file.filename : null;
    const user = await User.create({ ...data, profile_image: imageName }, { transaction: t });
    const driver = { user_id: user.id, license_number: data.license_number }

    const driverDetails = await Driver.create(driver, { transaction: t });
    await t.commit();
    return driverDetails;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};


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
