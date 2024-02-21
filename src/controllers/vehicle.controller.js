import httpStatus from 'http-status';
import * as errors from '../utils/api-error.js';
import * as response from '../middlewares/response-handler.js';
import { create } from '../services/vehicle.service.js';
import * as auth from '../auth/passport.js'
import bcrypt from 'bcrypt';

const responseHandler = response.default;
const { NotFoundError } = errors.default;

const addVehicle = async (req, res) => {
  console.log(req.body)
  const imageName = req.file ? req.file.filename : null;
  const vehDetails = await create({ ...req.body, image: imageName });

  res.status(httpStatus.CREATED).send(responseHandler(vehDetails));
};

export {
  addVehicle
};
