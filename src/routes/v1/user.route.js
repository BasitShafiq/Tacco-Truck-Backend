import express from 'express';
import { Validator } from 'express-json-validator-middleware';
import { handleGoogleAuthCallback, googleLogin, registerUser } from '../../controllers/user.controller.js';
import { addUserSchema } from '../../validations/users-request.schema.js';
import { uploadImagesToFolder } from '../../utils/imagesUpload.js';

const upload = uploadImagesToFolder("users");
const uploadMiddleware = upload.single("profile_image");

const router = express.Router();
const { validate } = new Validator();

router
  .route('/register/google')
  .get(googleLogin());

router
  .route('/auth/google/callback')
  .get(handleGoogleAuthCallback);

router
  .route('/register/google')
  .get(googleLogin());

router
  .route('/register')
  .post(uploadMiddleware, registerUser);


export default router;
