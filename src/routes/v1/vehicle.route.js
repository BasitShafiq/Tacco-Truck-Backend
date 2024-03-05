import express from 'express';
import { Validator } from 'express-json-validator-middleware';
// import { handleGoogleAuthCallback, googleLogin, registerUser } from '../../controllers/user.controller.js';
// import { addUserSchema } from '../../validations/users-request.schema.js';
import { uploadImagesToFolder } from '../../utils/imagesUpload.js';
import { addVehicle } from '../../controllers/vehicle.controller.js';
const upload = uploadImagesToFolder("vehicles");
const uploadMiddleware = upload.single("image");

const router = express.Router();
const { validate } = new Validator();


router
  .route('/create')
  .post(uploadMiddleware, addVehicle);
// router
//   .route('/find')
//   .post(uploadMiddleware, addVehicle);


export default router;

