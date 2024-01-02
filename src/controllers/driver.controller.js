import httpStatus from 'http-status';
import * as errors from '../utils/api-error.js';
import * as response from '../middlewares/response-handler.js';
import { create, findOne, update } from '../services/driver.service.js';
import * as auth from '../auth/passport.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const responseHandler = response.default;
const { NotFoundError } = errors.default;

const registerDriver = async (req, res) => {
  const driver  = req.body;


  
  const driverDetails = await create(  driver );

  res.status(httpStatus.CREATED).send(responseHandler(driverDetails));
};

const authenticateDriver = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findOne(email);
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).send('Invalid email');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(httpStatus.UNAUTHORIZED).send('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error logging in');
  }
};

const updateDriver = async (req, res) => {
  try {
    const userId = req.params.userId;
    let hashedPassword;

    const password = req.body.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const imageName = req.file ? req.file.filename : null;

    const updatedUser = await update(userId, { ...req.body, password: hashedPassword, profile_image: imageName });

    return res.status(httpStatus.OK).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
};




export {
  registerDriver,
  authenticateDriver,
  updateDriver
};
