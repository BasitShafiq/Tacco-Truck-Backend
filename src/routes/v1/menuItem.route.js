import express from 'express';
import { verifyToken } from '../../auth/authMiddleware.js';
import { createItem, updateItem , getItem,getAll, deleteItem } from '../../controllers/menu_item.controller.js';
import { isAuthorized } from '../../middlewares/is-authorizad.js';
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

  router
  .route('/getMenu/:vehId')
  .get(getAll);

  router
  .route('/getItem/:itemId')
  .get(getItem);
  
  router
  .route('/delete/:itemId')
  .get(verifyToken,isAuthorized('Driver'),deleteItem);

export default router;
