
import db from '../models/index.js';
const { MenuItem } = db.db;


const create = async data => MenuItem.create(data);

// const findOne = async (email) => {
//   try {
 //     const user = await User.findOne({
//       where: { email: email }
//     });
//     return user;
//   } catch (error) {
//     throw error;
//   }
// };

const update = async (itemId, updatedItemData) => {
  try {
    const menu_item = await MenuItem.findByPk(itemId);
    if (!menu_item) {
      throw new Error('menu item not found');
    }
    await menu_item.update(updatedItemData);

    return menu_item;
  } catch (error) {
    throw error;
  }
};
export {
  create,
//   findOne,
  update
};
