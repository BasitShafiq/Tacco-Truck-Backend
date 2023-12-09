import express from 'express';
import { Validator } from 'express-json-validator-middleware';
import { handleGoogleAuthCallback,googleLogin } from '../../controllers/user.controller.js';
import { addUserSchema } from '../../validations/users-request.schema.js';

const router = express.Router();
const { validate } = new Validator();

router
  .route('/register/google')
  .get(googleLogin());

router
  .route('/auth/google/callback')
  .get(handleGoogleAuthCallback);

export default router;
