import express from "express";

import {
  postLogin,
  postSignUp,
  postLogout,
  postAdminLogin,
} from "../controller/auth.js";

const authRouter = express();

authRouter.post("/auth/signup", postSignUp);
authRouter.post("/auth/login", postLogin);
authRouter.post("/auth/logout", postLogout);
authRouter.post("/auth/admin-login", postAdminLogin);
export default authRouter;
