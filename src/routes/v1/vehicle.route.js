import express from 'express';
import { verifyToken } from '../../auth/authMiddleware.js';
import { uploadImagesToFolder } from '../../utils/imagesUpload.js';
import { addVehicle, updateVehicle } from '../../controllers/vehicle.controller.js';
const upload = uploadImagesToFolder("vehicles");
const uploadMiddleware = upload.single("image");

const router = express.Router();


router
  .route('/create')
  .post(uploadMiddleware, addVehicle);
router
  .route('/update/:id')
  .put(verifyToken,uploadMiddleware, updateVehicle);

export default router;

