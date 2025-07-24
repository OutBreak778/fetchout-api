import bcrypt from "bcryptjs";
import { JWT_SECRET_KEY } from "../../config/constants.js";
import Token from "../../models/token.js";
import User from "../../models/user.js";
import { hashedPassword } from "../../utils/hash.js";
import logger from "../../utils/logger.js";
import { SendEmail } from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";

export async function loginAuthController(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    logger.info("All fields are required");
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const NormalEmail = email.toLowerCase();
  try {
    const existingUser = await User.findOne({ email: NormalEmail });
    if (!existingUser) {
      logger.info("No User found in DB");
      return res.status(404).json({
        success: false,
        message: "Something went wrong!",
      });
    }

    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      logger.warn(`Login failed: Wrong password for ${email}`);
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (!existingUser.isVerified) {
      logger.warn(`Login failed: Email not verified for ${email}`);
      return res
        .status(403)
        .json({ success: false, message: "Email not verified" });
    }

    const authToken = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
      expiresIn: "3d",
    });
    res.cookie("token", authToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    logger.info("User has loggedin successfully");
    return res.status(201).json({
      success: true,
      message: "Login successfully",
      user: {
        id: existingUser._id,
        userName: existingUser.userName,
        email: existingUser.email,
      },
    });
  } catch (error) {
    logger.error(`Internal Server Error: ${error.message}`);
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Internal Server error",
      });
  }
}

export async function logoutAuthController(req, res) {
  try {

    res.clearCookie("token", {
      httpOnly: true,
    })

    logger.info("Logout Successfully")
    return res.status(201).json({
      success: true,
      message: "Logout Successfully"
    })
    
  } catch (error) {
    logger.error(`Error occurred while logout: ${error.message}`)
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    })
  }
}



// Register Controller Code

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
      isVerified: false,
    });

    logger.info("User Created Succesfully", user._id);

    const emailToken = jwt.sign(
      { email: NormalEmail, id: user._id },
      JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );
    await Token.create({ userId: user._id, token: emailToken });

    console.log("Token:", emailToken);
    await SendEmail(email, emailToken);

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
