import express from "express";

import { postAddProduct } from "../controller/product.js";
import { isAdmin } from "../controller/auth.js";

import { upload } from "../utils/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/admin/add-product",
  isAdmin,
  upload.single("image"),
  postAddProduct
);

export default productRouter;
