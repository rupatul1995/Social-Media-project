import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AllRoutes from "./Routes/index.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
const app=express();
app.use(morgan("combined"));
app.use(cookieParser());
app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000"],
    })
  );
  dotenv.config();
app.use(express.json());


app.get("/", function (req, res) {
    res.send("working.");
  });
  
  app.use("/api/v1", AllRoutes);
  
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected."));
  
  app.listen(process.env.PORT_NUMBER, () => {
    console.log(`Server is running on port ${process.env.PORT_NUMBER}.`);
  });