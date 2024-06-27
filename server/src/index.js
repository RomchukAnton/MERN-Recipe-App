import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(process.env.MONGODB_CONNECT)
    .then(() => console.log("CONNECTED TO MONGODB !"))
    .catch((err) => console.error("Failed to Connect to MongoDb", err));

app.listen(port, () => console.log(`Server Running on Port ${port}`));


