import User from "../model/userModel.js"

export const getCurrentUser = async (req, res) => {
    try {

        let user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(404).json({ message: "user is not found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log("getCurrentUser error", error)
        return res.status(500).json({ messege: `getCurrentUser error ${error}` })
    }
}

export const getAdmin
    = async (req, res) => {
        try {
            let adminEmail = req.adminEmail;
            if (!adminEmail) {
                return res.status(404).json({ message: "Admin is not found" })
            }
            return res.status(201).json({
                email: adminEmail,
                role: "admin"
            })
        } catch (error) {
            console.log("getAdmin error", error)
            return res.status(500).json({ messege: `getAdmin error ${error}` })
        }
    }

// export const getAdmin = async (req, res) => {
//   try {
// Get user from database using the ID from token
//     const user = await User.findById(req.userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Admin only." });
//     }

//     return res.status(200).json({
//       email: user.email,
//       role: user.role,
//     });
//   } catch (error) {
//     console.log("getAdmin error", error);
//     return res.status(500).json({ message: `getAdmin error ${error}` });
//   }
// };



