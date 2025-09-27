// External modules

import express from "express";

import env from "dotenv";

import mongoose from "mongoose";

import cors from "cors";

import session from "express-session";

import connectMongodbSession from "connect-mongodb-session";
env.config();

// Local modules

import authRouter from "./routes/auth.js";

import productRouter from "./routes/product.js";

const PORT = process.env.PORT;

const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const MongoDBStore = connectMongodbSession(session);
const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "user-session",
});

app.use(
  session({
    secret: "mySecret",
    store: store,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: false, // set true if using https
      httpOnly: true,
    },
  })
);

app.get("/user-auth", (req, res) => {
  if (req.session.user) {
    return res.json({
      user: req.session.user,
      isLoggedIn: req.session.isLoggedIn,
    });
  } else {
    return res.json({ user: null, isLoggedIn: false });
  }
});

app.use(express.json());

app.use(authRouter);
app.use(productRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
