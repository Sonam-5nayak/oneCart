import User from "../model/userModel.js";

// Add to Cart


export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    // console.log("req.body:", req.body);

    // Get user from req.userId (make sure isAuth middleware sets this)
    const userData = await User.findById(req.userId);
    if (!userData) return res.status(404).json({ message: "User not found" });

    let cartData = userData.cartData || {};

    // ✅ Fix: Initialize item object if it doesn’t exist
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // ✅ Initialize size if it doesn’t exist
    if (!cartData[itemId][size]) {
      cartData[itemId][size] = 0;
    }

    // ✅ Increment quantity
    cartData[itemId][size] += 1;

    // Update DB
    await User.findByIdAndUpdate(req.userId, { cartData });

    return res.status(201).json({ message: "Added to cart", cartData });
  } catch (err) {
    console.error("AddToCart error:", err.message);
    res.status(500).json({ message: "AddToCart error", error: err.message });
  }
};


// Update Cart
export const UpdateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userData = await User.findById(req.userId);
    let cartData = await userData.cartData;
    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(req.userId, { cartData })

    return res.status(201).json({ message: "cart updated" });


  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "updateCart error" });
  }
};

// Get User Cart

export const getUserCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    return res.status(200).json(cartData);
  } catch (err) {
    console.error("getUserCart error:", err.message);
    res.status(500).json({ message: "getUserCart error", error: err.message });
  }
};







