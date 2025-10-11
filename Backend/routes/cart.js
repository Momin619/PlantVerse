import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
  updateQuantity,
} from "../controller/cart.js";
import { protect } from "../controller/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart/:id", protect, addToCart);
cartRouter.delete("/remove-from-cart/:id", protect, removeFromCart);
cartRouter.get("/cart", protect, getCart);
cartRouter.delete("/clear-cart", protect, clearCart);
cartRouter.patch("/update-quantity/:id", protect, updateQuantity);

export default cartRouter;
