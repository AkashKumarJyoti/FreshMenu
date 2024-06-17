import mongoose from "mongoose";

const uri = 'mongodb+srv://AKJ:ak30032002@cluster0.htp5e4q.mongodb.net/FreshMenu';
export const connectDB = async () => {
  mongoose.connect(uri)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));
}