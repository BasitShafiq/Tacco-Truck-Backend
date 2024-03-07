
import db from '../models/index.js';
const { Review, User } = db.db;

const create = async data => Review.create(data);

const findByVehicleId = async (vehicleId) => {
    try {
        const reviews = await Review.findAll({
            where: { vehicle_id: vehicleId },
            include: {
                model: User,
                attributes: ['name']
            }
        });
        return reviews;
    } catch (error) {
        throw error;
    }
};


export {
    create,
    findByVehicleId
};
