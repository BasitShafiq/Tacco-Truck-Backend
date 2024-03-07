import httpStatus from 'http-status';
import { create as createMenuItem } from '../services/menu_item.service.js';

const createItem = async (req, res) => {

  try {

    const imageName = req.file ? req.file.filename : null;
    const itemDetails = await createMenuItem({ ...req.body, image: imageName });
    res.status(httpStatus.CREATED).json({ success: true, message: "Item created Successfully", data: itemDetails });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error creating Item:", data: null });

  }
};

export {
  createItem

};
