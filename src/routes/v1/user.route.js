import express from 'express';
import { Validator } from 'express-json-validator-middleware';
import { handleGoogleAuthCallback, googleLogin, registerUser, loginUser, updateUser } from '../../controllers/user.controller.js';
import { addUserSchema } from '../../validations/users-request.schema.js';
import { uploadImagesToFolder } from '../../utils/imagesUpload.js';
import { verifyToken } from '../../auth/authMiddleware.js';
import { forgotPassword } from '../../auth/forgetPassword.js';

const upload = uploadImagesToFolder("users");
const uploadMiddleware = upload.single("profile_image");

const router = express.Router();
const { validate } = new Validator();

router
  .route('/register/google')
  .get(googleLogin());

router
  .route('/auth/google/callback')
  .get(handleGoogleAuthCallback);

router
  .route('/register/google')
  .get(googleLogin());

router
  .route('/register')
  .post(uploadMiddleware, registerUser);

router
  .route('/login')
  .post(loginUser);

router
  .route('/update/:userId')
  .put(verifyToken, uploadMiddleware, updateUser);

router
  .route('/forgot-password')
  .post(forgotPassword);



// router.get("/reset-password/:id/:token", async (req, res) => {
//   const { id, token } = req.params;
//   console.log(req.params);
//   const oldUser = await User.findOne({ _id: id });
//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!!" });
//   }
//   const secret = JWT_SECRET + oldUser.password;
//   try {
//     const verify = jwt.verify(token, secret);
//     res.render("index", { email: verify.email, status: "Not Verified" });
//   } catch (error) {
//     console.log(error);
//     res.send("Not Verified");
//   }
// });

// router.post("/reset-password/:id/:token", async (req, res) => {
//   const { id, token } = req.params;
//   const { password } = req.body;

//   const oldUser = await User.findOne({ _id: id });
//   if (!oldUser) {
//     return res.json({ status: "User Not Exists!!" });
//   }
//   const secret = JWT_SECRET + oldUser.password;
//   try {
//     const verify = jwt.verify(token, secret);
//     const encryptedPassword = await bcrypt.hash(password, 10);
//     await User.updateOne(
//       {
//         _id: id,
//       },
//       {
//         $set: {
//           password: encryptedPassword,
//         },
//       }
//     );

//     res.render("index", { email: verify.email, status: "verified" });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "Something Went Wrong" });
//   }
// });



export default router;
