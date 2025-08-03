import User from "../../models/user.js";
import logger from "../../utils/logger.js";

export async function userController(req, res) {
  const userId = req.user._id;
  if (!userId) {
    logger.warn("No User ID found");
    return res.status(404).json({
      success: false,
      message: "User ID not found",
    });
  }
  try {
    const user = await User.findById(userId).select("email userName _id avatar isVerified createdAt");
    if (!user) {
      logger.warn("Access denied");
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access.",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error(`User Controller Error : ${error}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
