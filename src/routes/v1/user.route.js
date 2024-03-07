import express from 'express';
import { Validator } from 'express-json-validator-middleware';
import { handleGoogleAuthCallback, googleLogin, registerUser, loginUser, updateUser } from '../../controllers/user.controller.js';
import { uploadImagesToFolder } from '../../utils/imagesUpload.js';
import { verifyToken } from '../../auth/authMiddleware.js';
import { forgotPassword } from '../../auth/forgetPassword.js';
import { resetPassword } from '../../auth/resetPasseord.js';

import db from '../../models/index.js';
const { User, Token } = db.db;

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
  .route('/register')
  .post(uploadMiddleware, registerUser);

router
  .route('/login')
  .post(loginUser);

router
  .route('/update/:userId')
  .put(verifyToken, uploadMiddleware, updateUser);

router
  .route('/forgot-password')
  .post(forgotPassword);


router
  .route('/reset-password/:token')
  .post(resetPassword);

export default router;
