import mongoose from "mongoose";
import 'dotenv/config';

const uri = process.env.DB_STRING;
export const connectDB = async () => {
  mongoose.connect(uri)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));
}