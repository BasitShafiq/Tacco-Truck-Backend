import express from 'express';

import usersRoute from './user.route.js';
import driversRoute from './driver.route.js';
import vehicleRoute from './vehicle.route.js';
import categoryRoute from './category.route.js';

const router = express.Router();

router.use('/users', usersRoute);
router.use('/categories', categoryRoute);
router.use('/drivers', driversRoute);
router.use('/vehicles', vehicleRoute);

export default router;
