import express from 'express';
import { verifyToken } from '../../auth/authMiddleware.js';
import { createItem, updateItem } from '../../controllers/menu_item.controller.js';
import { uploadImagesToFolder } from '../../utils/imagesUpload.js';
const upload = uploadImagesToFolder("menuItems");
const uploadMiddleware = upload.single("menu_item_image");
const router = express.Router();

router
  .route('/create')
  .post(uploadMiddleware, createItem);

router
  .route('/update/:itemId')
  .put(verifyToken,uploadMiddleware, updateItem);


export default router;
