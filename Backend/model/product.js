import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
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
    image: {
      type: String, // store image path or URL
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
