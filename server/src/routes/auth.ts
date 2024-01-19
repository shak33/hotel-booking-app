import express from 'express';
import { check } from 'express-validator';

import { userLogin } from '../controllers/auth';

const router = express.Router();

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').isString(),
  ],
  userLogin,
);

export default router;