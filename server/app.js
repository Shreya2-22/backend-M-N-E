import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/database.js";
import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
