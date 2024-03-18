import express from 'express';
import { createNotification } from '../../controllers/notification.controller.js';

const router = express.Router();

router
    .route('/create')
    .post(createNotification);

export default router;
