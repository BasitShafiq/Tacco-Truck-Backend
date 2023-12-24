import httpStatus from 'http-status';
import * as errors from '../utils/api-error.js';
import * as response from '../middlewares/response-handler.js';
import { create } from '../services/vehicle.service.js';
import * as auth from '../auth/passport.js'
import bcrypt from 'bcrypt';

const responseHandler = response.default;
const { NotFoundError } = errors.default;

const addVehicle = async (req, res) => {
  const vehicleDetails = req.body;
  // if (password !== confirm_password) {
  //   return res.status(httpStatus.BAD_REQUEST).send('Password and Confirm Password do not match');
  // }

  // const hashedPassword = await bcrypt.hash(password, 10);
  // const imageName = req.file ? req.file.filename : null;
  const vehDetails = await create({vehicleDetails });

  res.status(httpStatus.CREATED).send(responseHandler(vehDetails));
};

// const googleLogin = () => {
//   return [
//     auth.passport.authenticate('google', { scope: ['profile', 'email'] }),
//   ]
// };

// const handleGoogleAuthCallback = async (req, res, next) => {
//   auth.passport.authenticate('google', {
//     failureRedirect: '/',
//   })(req, res, async () => {
//     if (req.user) {
//       const userName = req.user.displayName;
//       const userEmail = req.user.emails[0].value;

//       console.log('User Name:', userName);
//       console.log('User Email:', userEmail);

//       res.status(200).json({
//         success: true,
//         userName: userName,
//         userEmail: userEmail,
//       });
//     } else {
//       console.error('Error: No user information found');
//       res.status(500).json({
//         success: false,
//         msg: 'Error: No user information found',
//       });
//     }
//   });
// };

export {

  addVehicle
};
