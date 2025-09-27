import Product from "../model/product.js";
export const postAddProduct = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, stock, description } = req.body;

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
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
