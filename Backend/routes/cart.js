import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
} from "../controller/cart.js";
import { protect } from "../controller/auth.js"; // your auth middleware

const cartRouter = express.Router();

cartRouter.post("/add-to-cart/:id", protect, addToCart);
cartRouter.delete("/remove-from-cart/:id", protect, removeFromCart);
cartRouter.get("/cart", protect, getCart);
cartRouter.delete("/clear-cart", protect, clearCart);

export default cartRouter;
