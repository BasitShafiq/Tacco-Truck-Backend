import httpStatus from 'http-status';
import * as errors from '../utils/api-error.js';
import * as response from '../middlewares/response-handler.js';
import { findAll, findById, create } from '../services/user.service.js';
import * as auth from '../auth/passport.js'

const responseHandler = response.default;

const { NotFoundError } = errors.default;

const googleLogin = () => {
  return [
    auth.passport.authenticate('google', { scope: ['profile', 'email'] }),
  ]
};


const handleGoogleAuthCallback = async (req, res, next) => {
  auth.passport.authenticate('google', {
    failureRedirect: '/',
  })(req, res, async () => {
    if (req.user) {
      const userName = req.user.displayName;
      const userEmail = req.user.emails[0].value;

      console.log('User Name:', userName);
      console.log('User Email:', userEmail);

      res.status(200).json({
        success: true,
        userName: userName,
        userEmail: userEmail,
      });
    } else {
      console.error('Error: No user information found');
      res.status(500).json({
        success: false,
        msg: 'Error: No user information found',
      });
    }
  });
};



export {
  handleGoogleAuthCallback,
  googleLogin
};
