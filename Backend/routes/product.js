import express from "express";

import { postAddProduct } from "../controller/product.js";

const productRouter = express();

productRouter.post("/admin/add-product", postAddProduct);

export default productRouter;
