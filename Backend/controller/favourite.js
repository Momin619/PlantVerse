import User from "../model/user.js";

// ✅ Add to favourites
export const postAddFavourite = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.session.user.id;
    const productId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.favourites.includes(productId)) {
      user.favourites.push(productId);
      await user.save();
    }

    res.status(200).json({ favourites: user.favourites });
  } catch (error) {
    console.error("Add Favourite Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get all favourites
export const getFavourites = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.session.user.id;
    const user = await User.findById(userId).populate("favourites");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ favourites: user.favourites });
  } catch (error) {
    console.error("Get Favourites Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Remove from favourites
export const removeFavourite = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.session.user.id;
    const productId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.favourites = user.favourites.filter(
      (id) => id.toString() !== productId
    );

    await user.save();

    res.status(200).json({ favourites: user.favourites });
  } catch (error) {
    console.error("Remove Favourite Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
