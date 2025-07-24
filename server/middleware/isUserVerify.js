import { JWT_SECRET_KEY } from "../config/constants.js";
import User from "../models/user.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";

export async function isUserVerify(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    logger.warn("Token is Required to verify User");
    return res.status(401).json({
      success: false,
      message: "Token is Required",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    const user = await User.findById(decoded.id);
    if (!user) {
      logger.warn("Unauthorized Access");
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    logger.error(`User Verification Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
