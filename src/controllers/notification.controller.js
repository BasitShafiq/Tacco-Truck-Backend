import httpStatus from 'http-status';
import { create } from '../services/notification.service.js';

const createNotification = async (req, res) => {
    try {
        await create(req.body);
        res.status(httpStatus.CREATED).json({ success: true, message: "Created Successfully" });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal Server Error" });
    }
};

export {
    createNotification
};
