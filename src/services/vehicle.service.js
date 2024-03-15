
import db from '../models/index.js';
const { Vehicle } = db.db;

const create = async data => Vehicle.create(data);
const update= async (vehicleId,updatedVehDetails) => {
  try{
      const vehicle=await Vehicle.findByPk(vehicleId);
      if(!vehicle)
      {
        throw new error("vehicle not found!")
      }
      await vehicle.update(updatedVehDetails);
      return vehicle;
  }catch(error)
  {
    throw error;
  }

}
const findOne = async (attribute, value) => {
  try {
    const vehicle = await Vehicle.findOne({
      where: { [attribute]: value }
    });
    return vehicle;
  } catch (error) {
    throw error;
  }
}
const getItem = async (itemId) => {
  try {
    const vehicle = await Vehicle.findByPk(itemId    );
    return vehicle;
  } catch (error) {
    throw error;
  }
}
export {
  create,
  update,
  findOne,
  getItem
};
