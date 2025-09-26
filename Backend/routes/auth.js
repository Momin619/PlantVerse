import express from "express";

import { postLogin, postSignUp } from "../controller/auth.js";

const authRouter = express();

authRouter.post("/auth/signup", postSignUp);
authRouter.post("/auth/login", postLogin);

export default authRouter;
