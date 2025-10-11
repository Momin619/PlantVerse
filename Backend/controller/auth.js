import User from "../model/user.js";
import bcrypt from "bcryptjs";
export const postSignUp = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: fullName,
      email,
      password: hashedPassword,
      role: "user",
    });
    await user.save();
    return res.status(201).json({ user });
  } catch (err) {
    console.log(err);
  }
};

export const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const error_message = "Invalid email or password";
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: error_message });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: error_message });
    }
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    req.session.user = userData;
    req.session.isLoggedIn = true;
    await req.session.save();
    return res
      .status(200)
      .json({ user: req.session.user, isLoggedIn: req.session.isLoggedIn });
  } catch (error) {
    console.log(error);
  }
};

export const postLogout = async (req, res, next) => {
  try {
    req.session.user = null;
    req.session.isLoggedIn = false;
    await req.session.save();
    return res.status(200).json({
      user: req.session.user,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find the admin
    const user = await User.findOne({ email, role: "admin" });
    if (!user) {
      return res.status(401).json({ message: "Admin not found" });
    }

    // 2️⃣ Check password (await is needed!)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password doesn't match" });
    }

    // 3️⃣ Prepare user data for session
    const userData = {
      id: user._id,
      name: user.fullName || user.name,
      email: user.email,
      role: user.role,
    };

    // 4️⃣ Save session
    req.session.user = userData;
    req.session.isLoggedIn = true;
    await req.session.save();

    // 5️⃣ Respond
    return res.status(200).json({
      user: req.session.user,
      isLoggedIn: req.session.isLoggedIn,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// middleware/adminAuth.js
export const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied. Admins only." });
};

export const protect = async (req, res, next) => {
  try {
    if (!req.session?.user?.id) {
      return res.status(401).json({ message: "Not authorized, please login" });
    }

    const user = await User.findById(req.session.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Not authorized" });
  }
};
