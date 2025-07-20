import User from "../models/user.js";
import { hashedPassword } from "../utils/hash.js";
import logger from "../utils/logger.js";

export async function loginAuthController(req, res) {
  try {
    return res.status(200).json({
      success: true,
      message: "Login Page from Auth Controller",
    });
  } catch (error) {
    logger.error(`Internal Server Error: ${error.message}`);
    process.exit(1);
  }
}

export async function registerAuthController(req, res) {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password length should be more than 6 letter",
    });
  }

  const NormalEmail = email.toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(NormalEmail)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format." });
  }
  try {
    const existingUser = await User.findOne({ email: NormalEmail });

    if (existingUser) {
      logger.warn("User exists in database");
      return res.status(401).json({
        success: false,
        message: "User Already exists!",
      });
    }

    const hashed = await hashedPassword(password);

    const user = await User.create({
      userName,
      email: NormalEmail,
      password: hashed,
    });

    logger.info("User Created Succesfully", user._id);
    

    return res.status(201).json({
      success: true,
      message: "User Register Succesfully",
    });
  } catch (error) {
    logger.error(`Internal Server Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
