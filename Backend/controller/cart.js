import Cart from "../model/cart.js";
import Product from "../model/product.js";

// 🛒 Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product._id.toString() === id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ product: id, quantity: 1 });
    }

    await cart.save();
    await cart.populate("items.product");

    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    res.json({ cart: { items: cart.items, totalPrice } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Remove from Cart
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product._id.toString() !== id
    );

    await cart.save();
    await cart.populate("items.product");

    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    res.json({ cart: { items: cart.items, totalPrice } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📦 Get Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) {
      return res.json({ cart: { items: [], totalPrice: 0 } });
    }

    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    res.json({ cart: { items: cart.items, totalPrice } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔁 Update Quantity (+/-)
export const updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item.product._id.toString() === id);

    if (!item) return res.status(404).json({ message: "Item not found" });

    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease") {
      item.quantity = Math.max(item.quantity - 1, 1);
    }

    await cart.save();
    await cart.populate("items.product");

    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    res.json({ cart: { items: cart.items, totalPrice } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🧹 Clear Cart
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.json({ cart: { items: [], totalPrice: 0 } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
