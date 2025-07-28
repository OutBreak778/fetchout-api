import UsageModel from "../models/usageLog.js";
import logger from "../utils/logger.js";

export async function usageLog(req, res, next) {
  const timeStamp = Date.now();

  try {
    res.on("finish", async () => {
      try {
        const responseTime = Date.now() - timeStamp
        const urlPath = req.endpoint.urlPath;
        const userId = req.user._id;
        const endpointId = req.endpoint._id;
        const statusCode = res.statusCode;
        const ipAddress =
          req.headers["x-forwarded-for"] || req.connection.remoteAddress;

        if (!userId || !endpointId) {
          logger.warn("User ID and Endpoint ID is required");
        }

        await UsageModel.create({
          userId,
          endpointId,
          ipAddress,
          statusCode,
          responseTime,
          urlPath,
        });

        next()
      } catch (error) {
        logger.error(`User Verification Error: ${error.message}`);
        next();
      }
    });


    next();
  } catch (error) {
    logger.error(`User Verification Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
