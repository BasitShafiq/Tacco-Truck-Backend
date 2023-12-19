import express from 'express';
import { Validator } from 'express-json-validator-middleware';
import { handleGoogleAuthCallback, googleLogin, registerUser, loginUser, updateUser } from '../../controllers/user.controller.js';
import { addUserSchema } from '../../validations/users-request.schema.js';
import { uploadImagesToFolder } from '../../utils/imagesUpload.js';
import { verifyToken } from '../../auth/authMiddleware.js';

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

router
  .route('/login')
  .post(loginUser);

router
  .route('/update/:userId')
  .put(verifyToken, uploadMiddleware, updateUser);


export default router;
