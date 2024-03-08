
import db from '../models/index.js';
const { Review, User, Vehicle } = db.db;

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

const findByUserId = async (userId) => {
    try {
        const reviews = await Review.findAll({
            where: { user_id: userId },
            include: {
                model: Vehicle,
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
    findByVehicleId,
    findByUserId
};
