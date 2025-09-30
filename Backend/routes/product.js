import express from "express";

import {
  postAddProduct,
  getProducts,
  getEditProduct,
  putEditProduct,
  deleteProduct,
} from "../controller/product.js";
import { isAdmin } from "../controller/auth.js";

import { upload } from "../utils/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/admin/add-product",
  isAdmin,
  upload.single("image"),
  postAddProduct
);

productRouter.get("/admin/products", getProducts);

productRouter.get("/admin/edit-product/product/:id", getEditProduct);

productRouter.put(
  "/admin/edit-product/product/:id",
  upload.single("image"),
  putEditProduct
);

productRouter.delete("/admin/delete-product/product/:id", deleteProduct);

export default productRouter;
