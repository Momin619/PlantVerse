import User from "../model/user.js";
import Cart from "../model/cart.js";
import Product from "../model/product.js";

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id; // ✅ from protect middleware
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
        totalPrice: product.price,
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }

      cart.totalPrice = await calculateTotal(cart.items);
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (err) {
    next(err);
  }
};

async function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    total += product.price * item.quantity;
  }
  return total;
}

export const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex === -1)
      return res.status(404).json({ message: "Product not in cart" });

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }

    cart.totalPrice = await calculateTotal(cart.items);
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (err) {
    next(err);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price image"
    );

    if (!cart) return res.status(404).json({ message: "Cart empty" });
    res.status(200).json({ success: true, cart });
  } catch (err) {
    next(err);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    await Cart.findOneAndDelete({ user: userId });
    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (err) {
    next(err);
  }
};
