import express from 'express';
import { giveReview, getReviewsByVehicle, getReviewsByUser } from '../../controllers/review.controller.js';
import { verifyToken } from '../../auth/authMiddleware.js';

const router = express.Router();

router
    .route('/create')
    .post(verifyToken, giveReview);

router
    .route('/get-by-vehicle/:id')
    .get(verifyToken, getReviewsByVehicle);

router
    .route('/get-by-user/:id')
    .get(verifyToken, getReviewsByUser);

export default router;
