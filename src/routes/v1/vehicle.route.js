import express from 'express';
import { Validator } from 'express-json-validator-middleware';
// import { handleGoogleAuthCallback, googleLogin, registerUser } from '../../controllers/user.controller.js';
// import { addUserSchema } from '../../validations/users-request.schema.js';
import { uploadImagesToFolder } from '../../utils/imagesUpload.js';

const upload = uploadImagesToFolder("users");
const uploadMiddleware = upload.single("profile_image");

const router = express.Router();
const { validate } = new Validator();


router
  .route('/register/google')
  .get(googleLogin());


router
  .route('/addVehicle')
  .post(uploadMiddleware,addVehicle );


export default router;
