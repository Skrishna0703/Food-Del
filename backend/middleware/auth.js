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

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ success: false, message: "Token expired. Please login again." });
      }
      return res
        .status(401)
        .json({ success: false, message: "Invalid Token" });
    }

    // Fetch user from DB
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user; // attach whole user object
    next();
  } catch (error) {
    console.error("JWT Auth Error:", error);
    next(error); // pass to global error handler
  }
};

// Optional: middleware for role-based authorization
export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "You do not have permission to access this resource",
    });
  }
  next();
};

export default authMiddleware;
