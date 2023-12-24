import express from 'express';

import usersRoute from './user.route.js';
import driversRoute from './driver.route.js';

const router = express.Router();

router.use('/users', usersRoute);

router.use('/drivers', driversRoute);

export default router;
