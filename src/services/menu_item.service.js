
import db from '../models/index.js';
const { MenuItem } = db.db;


const create = async data => MenuItem.create(data);

const getItem = async (itemId) => {
  try {
     const menu_item = await MenuItem.findByPk(itemId);
    return menu_item;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw new Error("Failed to fetch menu items");
  }
};
const getMenu =async (attribute,value)=>{

  try {
    const menuItems=await MenuItem.findAll({
      where: {[attribute]:value}
    });
    return menuItems;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw new Error("Failed to fetch menu items"); 
  }

}

const findOne = async (attribute, value) => {
  try {
    const item = await MenuItem.findOne({
      where: { [attribute]: value }
    });
    return item;
  } catch (error) {
    throw error;
  }
}

const update = async (itemId, updatedItemData) => {
  try {
    const menu_item = await MenuItem.findByPk(itemId);
    if (!menu_item) {
      throw new Error('menu item not found');
    }
  await menu_item.update(updatedItemData);
  
    return menu_item;
  } catch (error) {
    console.error("Error updating menu items:", error);
    throw new Error("Failed to update menu items");
  }
};

const deleteItem=async (itemId)=>{
  try {
    const deletedRows = await MenuItem.destroy({ where: { id: itemId } });
    if (deletedRows === 0) {
      throw new Error('Item not found');
    }
    return "success";
  } catch (error) {
    throw error;
  }
}
export {
  create,
  getItem,
  update,
  getMenu,
  deleteItem,
  findOne
};
