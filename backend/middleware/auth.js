// import jwt from "jsonwebtoken";

// const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
//     }

//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.body.userId = decoded.id;
//     next();
//   } catch (error) {
//     console.error("JWT Auth Error:", error);
//     res.status(401).json({ success: false, message: "Invalid Token" });
//   }
// };

// export default authMiddleware;
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized. Login Again." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch user from DB and attach to request
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user; // ✅ attach whole user object
    next();
  } catch (error) {
    console.error("JWT Auth Error:", error);
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;
