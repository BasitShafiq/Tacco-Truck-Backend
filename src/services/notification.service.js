
import db from '../models/index.js';
const { Notification } = db.db;


const create = async (data) => {
    try {
        const notification = await Notification.create(data);
        return notification;
    } catch (error) {
        throw error;
    }
};

const findAll = async (userId) => {
    try {
        const notification = await Notification.findAll({ where: { user_id: userId } });
        return notification;
    } catch (error) {
        throw error;
    }
};

export {
    create,
    findAll
};