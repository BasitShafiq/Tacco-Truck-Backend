import express from 'express';
import { uploadImagesToFolder } from '../../utils/imagesUpload.js';
import { addVehicle } from '../../controllers/vehicle.controller.js';
const upload = uploadImagesToFolder("vehicles");
const uploadMiddleware = upload.single("image");

const router = express.Router();


router
  .route('/create')
  .post(uploadMiddleware, addVehicle);

export default router;

