import express from 'express';
import { Validator } from 'express-json-validator-middleware';
import { handleGoogleAuthCallback, googleLogin, registerUser, loginUser, updateUser } from '../../controllers/user.controller.js';
import { addUserSchema } from '../../validations/users-request.schema.js';
import { verifyToken } from '../../auth/authMiddleware.js';
import { registerDriver,updateDriver } from '../../controllers/driver.controller.js';
const router = express.Router();
const { validate } = new Validator();


router
  .route('/register')
  .post( registerDriver);

router
  .route('/update/:driverId')
  .put(verifyToken, updateDriver);


export default router;
