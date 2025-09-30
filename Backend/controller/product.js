import Product from "../model/product.js";

export const postAddProduct = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, stock, description, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const product = new Product({
      name,
      stock,
      description,
      image: imagePath,
      createdBy: req.session.user.id,
      price,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(404);
    console.log(error);
  }
};
