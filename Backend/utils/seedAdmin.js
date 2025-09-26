// This files creates an admin by injecting admin name , password and email from env

// External modules

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// local modules

import User from "../model/user.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;
    // Check if admin already exists
    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      admin = await User.create({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });

      console.log("✅ Admin created:", adminEmail);
    } else {
      console.log("⚠️ Admin already exists:", adminEmail);
    }

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
