import express from 'express';
import { check } from 'express-validator';

import { userRegistration } from '../controllers/users';

const router = express.Router();

router.post(
  '/register', 
  [
    check('firstName', 'First name is required').isString(),
    check('lastName', 'Last name is required').isString(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with 8 or more characters required').isLength({ min: 8 }),
  ],
  userRegistration
);

export default router;