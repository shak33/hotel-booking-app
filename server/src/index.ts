import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI as string);

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

app.get('/api/test', async (req: Request, res: Response) => {
  res.json({
    message: "Simple API test",
  })
});

app.listen(8000, () => {
  console.log(`Server is listening on port 8000`);
});