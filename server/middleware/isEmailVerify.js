import User from "../models/user.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";

export async function isEmailVerify(req, res, next) {
  const { token } = req.query;
  console.log("Token Received:", req.query.token)

  if (!token) {
    logger.warn("No token is given to verify Email");
    return res.status(400).json({
      success: false,
      message: "Token is Required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      logger.warn("No user found");
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (user.isVerified === "true") {
      logger.warn("User is Already verified");
      return res
        .status(200)
        .json({ success: true, message: "Email already verified." });
    }

    user.isVerified = "true";
    await user.save();

    logger.info("User has been verified");
    return res.status(201).json({
      success: true,
      message: "Email verified Successfully",
    });
  } catch (error) {
    logger.error(`Error Occurred: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Email Verification Failed!",
    });
  }
}
