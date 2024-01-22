import { Request, Response } from 'express';
import cloudinary from 'cloudinary';

import Hotel from '../models/hotel';

export const createHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel = req.body;

    const uploadPromieses = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString('base64');
      const base64EncodedImageString = `data:${image.mimetype};base64,${b64}`;
      const res = await cloudinary.v2.uploader.upload(base64EncodedImageString);

      return res.url;
    });

    const imageUrls = await Promise.all(uploadPromieses);
    newHotel.imageUrls = imageUrls;
    newHotel.userId = req.userId;

    const createdHotel = new Hotel(newHotel);
    await createdHotel.save();

    res.status(201).json({
      status: 'success',
      message: 'Hotel created',
    });
  } catch (error) {
    console.error('Error while creatinga new hotel', error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    })
  }
};