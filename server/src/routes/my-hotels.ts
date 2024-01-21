import express from 'express';
import { check } from 'express-validator';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  }
});

import { verifyToken } from '../middleware/auth';

import { createHotel } from '../controllers/my-hotels';

router.post(
  '/create',
  verifyToken,
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('country').notEmpty().withMessage('Country is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('type').notEmpty().withMessage('Hotel type is required'),
    check('pricePerNight').notEmpty().isNumeric().withMessage('Price per night is required'),
    check('facilities').isArray({ min: 1 }).withMessage('At least one facility is required'),
    check('starRating').notEmpty().isNumeric().withMessage('Star rating is required'),
    check('adultCount').notEmpty().isNumeric().withMessage('Adult count is required'),
    check('childrenCount').notEmpty().isNumeric().withMessage('Children count is required'),
  ],
  upload.array('imageFiles', 6),
  createHotel
);

export default router;