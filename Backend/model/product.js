import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  stock: {
    required: true,
    type: Number,
  },
  description: {
    required: true,
    type: String,
  },
});

export default mongoose.model("Product", ProductSchema);
