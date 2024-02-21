import express from 'express';
import { createCategory } from '../../controllers/category.controller.js';
import { uploadImagesToFolder } from '../../utils/imagesUpload.js';

const upload = uploadImagesToFolder("categories");
const uploadMiddleware = upload.single("image");
const router = express.Router();

router
    .route('/create')
    .post(uploadMiddleware, createCategory);

export default router;
