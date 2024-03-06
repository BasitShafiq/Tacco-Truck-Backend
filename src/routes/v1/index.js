import express from 'express';

import usersRoute from './user.route.js';
import vehicleRoute from './vehicle.route.js';
import menuItemRoute from './menuItem.route.js';
import categoryRoute from './category.route.js';

const router = express.Router();

router.use('/users', usersRoute);
router.use('/categories', categoryRoute);
router.use('/menu_item', menuItemRoute);
router.use('/vehicles', vehicleRoute);

export default router;
