import httpStatus from 'http-status';
import { create as createMenuItem , update} from '../services/menu_item.service.js';

const createItem = async (req, res) => {

  try {

    const imageName = req.file ? req.file.filename : null;
    const itemDetails = await createMenuItem({ ...req.body, image: imageName });
    res.status(httpStatus.CREATED).json({ success: true, message: "Item created Successfully", data: itemDetails });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error creating Item:", data: null });

  }
};

const updateItem = async (req, res) =>{
try{
  const itemId=req.params.itemId;
  const imageName = req.file ? req.file.filename : null;

  const updatedMenuItem=await update(itemId, { ...req.body, image:imageName });
  return res.status(httpStatus.OK).json({message:"Item update successfully!",updatedMenuItem})
}catch(error)
{
  console.error("error updating menu item!",error);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal server error")

}
}
export {
  createItem,
  updateItem

};
