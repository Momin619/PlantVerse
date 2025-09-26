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

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Passwords are not matched" });
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
