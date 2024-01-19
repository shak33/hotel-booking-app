import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';

export const userLogin = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const {
    email,
    password,
    keepLoggedIn,
  } = req.body;
  
  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({
      userId: user.id,
    }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: keepLoggedIn ? '30d' : '1d',
    });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
};