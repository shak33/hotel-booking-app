import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';

import userRoutes from './routes/users';
import authRoutes from './routes/auth';

mongoose.connect(process.env.MONGODB_URI as string);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.get('/api/test', async (req: Request, res: Response) => {
  res.json({
    message: "Simple API test",
  })
});

app.use(express.static(path.join(__dirname, '../../client/build')));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(8000, () => {
  console.log(`Server is listening on port 8000`);
});