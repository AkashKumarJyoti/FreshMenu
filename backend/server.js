import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import 'dotenv/config';

// App Config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());    // To establish the connection between backend and frontend

// DB connection
connectDB();

// Food Fetching API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));

// Authentication API endpoints
app.use('/api/user', userRouter);

// Cart Data API endpoints
app.use('/api/cart', cartRouter);

// Place Order API endpoints
app.use('/api/order', orderRouter);

app.get('/', (req, res)=> {
  res.send("Hello from the backend");
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})