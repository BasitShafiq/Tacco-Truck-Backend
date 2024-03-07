import express from 'express';
import { giveReview, getReviewsByVehicle } from '../../controllers/review.controller.js';
import { verifyToken } from '../../auth/authMiddleware.js';
import db from '../../models/index.js';
const { Review } = db.db;

const router = express.Router();

router
    .route('/create')
    .post(verifyToken, giveReview);

router
    .route('/get-by-vehicle/:id')
    .get(verifyToken, getReviewsByVehicle);

export default router;
