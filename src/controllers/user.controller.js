import httpStatus from 'http-status';
import { create, findOne, update } from '../services/user.service.js';
import * as auth from '../auth/passport.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const registerUser = async (req, res) => {
  let password = req.body.password;
  let confirm_password = req.body.confirm_password;
  if (password !== confirm_password) {
    return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: "Password and Confirm Password do not match" });
  }
  const imageName = req.file ? req.file.filename : null;
  const userDetails = await create({ ...req.body, profile_image: imageName });

  res.status(httpStatus.CREATED).json({ success: true, message: "Created Successfully", data: userDetails });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findOne('email', email);
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: "Invalid email" });

    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: "Invalid password" });

    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error Loging In...." });

  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    let imageName;
    if (req.file) {
      imageName = req.file.filename;
    }

    const updatedUser = await update(userId, { ...req.body, profile_image: imageName });

    return res.status(httpStatus.OK).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
};

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

      res.status(200).json({
        success: true,
        userName: userName,
        userEmail: userEmail,
      });
    } else {
      res.status(500).json({
        success: false,
        msg: 'Error: No user information found',
      });
    }
  });
};

export {
  handleGoogleAuthCallback,
  googleLogin,
  registerUser,
  loginUser,
  updateUser
};
