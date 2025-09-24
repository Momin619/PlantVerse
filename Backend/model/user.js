import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // 👈 role
});

export default mongoose.model("User", UserSchema);
