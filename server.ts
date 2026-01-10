import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";

import connectDB from "./config/mongodb";
import connectCloudinary from "./config/cloudinary";

import userRouter from "./routes/userRoute";
import productRouter from "./routes/productRoute";
import reservationRoute from "./routes/reservationRoute";

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/reservation", reservationRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("API Working 🚀");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
