import Product from "../model/product.js";

import path from "path";

import fs from "fs";

export const postAddProduct = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, stock, description, price, type, category } = req.body;

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
      type,
      category,
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

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(404);
  }
};

export const getEditProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
  }
};

export const putEditProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Destructure data from request body
    const { name, stock, description, price, type, category } = req.body;

    // Update product fields
    product.name = name ?? product.name;
    product.stock = stock ?? product.stock;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.type = type ?? product.type;
    product.category = category ?? product.category;

    // If a new image is uploaded, update it, otherwise keep the old one
    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    // Save updated product
    const updatedProduct = await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image file if exists
    console.log(product);

    if (product.image) {
      // Assuming product.image = "/uploads/filename.jpg"
      const imagePath = path.join(process.cwd(), product.image);
      // Adjust "public" if your uploads folder is somewhere else

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image:", err);
        } else {
          console.log("Image deleted:", imagePath);
        }
      });
    }

    // Delete product from DB
    await product.deleteOne();

    res.json({ message: "Product and image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
  }
};
