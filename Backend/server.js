import express from "express";

import env from "dotenv";

import mongoose from "mongoose";

env.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
