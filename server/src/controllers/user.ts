import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '../models/user';

export const userRegistration = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid data",
      errors: errors.array(),
    });
  }

  try {
    const {
      email,
      password,
      firstName,
      lastName,
    } = req.body;

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const createdUser = new User({
      email,
      password,
      firstName,
      lastName,
    });

    await createdUser.save();

    const token = jwt.sign({
      userId: createdUser.id,
    }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1d",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.status(201).json({
      message: "User created",
    });
  } catch (error: any) {
    console.log(error);

    res.status(500).send({
      message: "Something went wrong"
    })
  }
}