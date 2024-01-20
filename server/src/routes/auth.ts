import express, { Request, Response } from 'express';
import { check } from 'express-validator';

import { verifyToken } from '../middleware/auth';

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

router.get(
  '/validate-token',
  verifyToken,
  (req: Request, res: Response) => {
    res.status(200).json({
      status: 'success',
      data: {
        userId: req.userId,
      }
    })
  }
)

export default router;