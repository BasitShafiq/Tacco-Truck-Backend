import httpStatus from 'http-status';
import { create as createMenuItem ,findOne as findOneValue  , update,getItem as getOne,getMenu,deleteItem as deleteOne} from '../services/menu_item.service.js';
import { getItem as getVehicle} from '../services/vehicle.service.js';
const createItem = async (req, res) => {

  try {

    const imageName = req.file ? req.file.filename : null;
    const itemDetails = await createMenuItem({ ...req.body, image: imageName });
    res.status(httpStatus.CREATED).json({ success: true, message: "Item created Successfully", data: itemDetails });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error creating Item:", data: null });

  }
};
const getAll= async (req,res)=>{
 
  try {
    const id=req.params.vehId;
    if (!id){
        return res.status(httpStatus.BAD_REQUEST).json({success:false,message:"Error: No id found in request!"});
    }
    console.log(id);
    const items= await getMenu('vehicle_id',id);
    if(!items){
      return res.status(httpStatus.BAD_REQUEST).json({success:"false",message:"no menu entry against the Id"});
    }
    return res.json({items,message:"success"});

  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:"error retrieving Menu"});
  }
}
const getItem= async (req,res)=>{
 
  try {
    const id=req.params.itemId;
    if (!id){
        return res.status(httpStatus.BAD_REQUEST).json({success:false,message:"Error: No id found in request!"});
    }
    const item= await getOne(id);
    if(!item){
      return res.status(httpStatus.BAD_REQUEST).json({success:"false",message:"no menu against the veh Id"});
    }
    return res.json({item,message:"success"});

  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:"error retrieving Menu item"});
  }
}
const updateItem = async (req, res) =>{
try{
  const itemId=req.params.itemId;
  const imageName = req.file ? req.file.filename : null;
  if(req.body.vehicle_id)
    {
      delete req.body.vehicle_id
    }
  const updatedMenuItem=await update(itemId, { ...req.body, image:imageName });
  
  return res.status(httpStatus.OK).json({message:"Item update successfully!",updatedMenuItem})
}catch(error)
{
  console.error("error updating menu item!",error);
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal server error")

}


}
const deleteItem= async (req,res) =>{
  try {
    const id=req.params.id;
    if(!id)
    {
      return res.status(httpStatus.BAD_REQUEST).json({success:false,message:"error:No, Id found"})
    }
    const itemToDelete=await findOneValue(id);
    if(!itemToDelete){
      return res.status(httpStatus.BAD_REQUEST).json({success:false,message:"Erorr:no menu against the Id"});
    }
    const vehicle=await getVehicle(itemToDelete.vehicle_id);
    if(!vehicle){
      return res.status(httpStatus.UNAUTHORIZED).json({success:false,message:"Erorr :Unauthorized Access!"});
    }

    if(vehicle.user_id !== req.user.id)
    {
      return res.status(httpStatus.BAD_REQUEST).json({success:false,message:"no menu item for the Id"});
   
    }
    const result=await deleteOne(id);
    return res.status(httpStatus.NO_CONTENT).json({success:true,message:"Item Deleted Successfully"})    
  } catch (error) {
    console.log('error deleting menu item',error)
    throw new Error("Failed to delete item");
  }


}
export {
  createItem,
  getItem,
  getAll,
  updateItem,
  deleteItem
};
