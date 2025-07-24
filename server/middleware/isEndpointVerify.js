import ApiEndpoint from "../models/apiEndpoint.js";
import logger from "../utils/logger.js";

export async function isEndpointVerify(req, res, next) {
  const { slug, apiKey } = req.params;
 
  try {
    const endpoint = await ApiEndpoint.findOne({
      slug,
      apiKey,
    }).select("userId _id urlPath slug apiKey"); // bring the user too if needed

    if (!endpoint) {
      return res.status(404).json({
        success: false,
        message: "Invalid slug or API key",
      });
    }

    req.endpoint = endpoint;
    req.user = endpoint.userId; // attach the user manually
    next();
  } catch (error) {
    logger.error(`Endpoint Verification Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
