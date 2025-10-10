import User from "../model/user.js";

// ✅ Add to favourites
export const postAddFavourite = async (req, res) => {
  try {
    // Check session
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.session.user.id;
    const { id: productId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicate favourites
    if (!user.favourites.includes(productId)) {
      user.favourites.push(productId);
      await user.save();
    }

    res.status(200).json({
      message: "Added to favourites",
      favourites: user.favourites.map((id) => id.toString()),
    });
  } catch (error) {
    console.error("Add Favourite Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get all favourites (populated)
export const getFavourites = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.session.user.id;
    const user = await User.findById(userId).populate("favourites");
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Fetched favourites successfully",
      favourites: user.favourites,
    });
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
    const { id: productId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out the removed favourite
    user.favourites = user.favourites.filter(
      (favId) => favId.toString() !== productId
    );

    await user.save();

    res.status(200).json({
      message: "Removed from favourites",
      favourites: user.favourites.map((id) => id.toString()),
    });
  } catch (error) {
    console.error("Remove Favourite Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
