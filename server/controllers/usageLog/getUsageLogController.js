import ApiEndpoint from "../../models/apiEndpoint.js";
import UsageModel from "../../models/usageLog.js";
import logger from "../../utils/logger.js";

export async function getAllUsageLogController(req, res) {
  try {
    const userId = req.user._id;
    const logs = await UsageModel.find({ userId }).populate("userId", "userName email").populate("endpointId", "name slug description")

    if (!logs || logs.length === 0) {
      logger.warn("There are no logs found in DB");
      return res.status(404).json({
        success: false,
        message: "No usage logs found",
      });
    }

    logger.info("Logs fetched Successfully");

    return res.status(200).json({
      success: true,
      message: "Fetched usage logs",
      usage: logs,
    });
  } catch (error) {
    logger.error(`Get Usage Logs Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}

export async function getSingleUsageController(req, res) {
  const userId = req.user._id;
  const { slug } = req.params;

  if (!userId) {
    logger.warn("No User ID is provided");
    return res.status(404).json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const endpoint = await ApiEndpoint.findOne({ slug }).select("slug _id");
    if (!endpoint) {
      logger.warn("There are no logs found in DB");
      return res.status(404).json({
        success: false,
        message: "No usage logs found",
      });
    }

    const usage = await UsageModel.find({ endpointId: endpoint._id });
    console.log(usage.length);

    return res.status(200).json({
      success: true,
      message: `Fetched usage Logs: ${slug}`,
      usage: usage,
    });
  } catch (error) {
    logger.error(`Get Usage Logs Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
