import express from 'express';
import { verifyToken } from '../../auth/authMiddleware.js';
import { registerDriver, updateDriver } from '../../controllers/driver.controller.js';
import { uploadImagesToFolder } from '../../utils/imagesUpload.js';
const upload = uploadImagesToFolder("drivers");
const uploadMiddleware = upload.single("profile_image");
const router = express.Router();

router
  .route('/register')
  .post(uploadMiddleware, registerDriver);

router
  .route('/update/:driverId')
  .put(verifyToken, updateDriver);


export default router;
