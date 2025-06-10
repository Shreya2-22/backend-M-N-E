import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db/database.js';
import userRouter from './routes/user.js';
import bodyParser from 'body-parser';

connectDB();
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});