import httpStatus from 'http-status';
import { create, findByVehicleId } from '../services/review.service.js';

const giveReview = async (req, res) => {
    try {
        const reviewDetails = await create({ ...req.body });
        res.status(httpStatus.CREATED).json({ success: true, message: "Created Successfully" });

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal Server Error" });

    }
};

const getReviewsByVehicle = async (req, res) => {
    const vehicleId = req.params.id;
    try {
        const reviews = await findByVehicleId(vehicleId);
        res.status(httpStatus.CREATED).json({ success: true, message: "Fetched Successfully", data: reviews });

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal Server Error" });

    }
};

export {
    giveReview,
    getReviewsByVehicle
};
