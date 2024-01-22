import { Schema, model } from 'mongoose';

export interface HotelInterface {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childrenCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}

const hotelSchema = new Schema<HotelInterface>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String, 
    required: true,
  },
  city: {
    type: String, 
    required: true,
  },
  country: {
    type: String, 
    required: true,
  },
  description: {
    type: String, 
    required: true,
  },
  type: {
    type: String, 
    required: true,
  },
  adultCount: {
    type: Number, 
    required: true,
  },
  childrenCount: {
    type: Number, 
    required: true,
  },
  facilities: {
    type: [String],
    required: true,
  },
  pricePerNight: {
    type: Number, 
    required: true,
  },
  starRating: {
    type: Number, 
    required: true,
  },
  imageUrls: {
    type: [String], 
    required: true,
  },
}, {
  timestamps: true,
});

export default model<HotelInterface>('Hotel', hotelSchema);