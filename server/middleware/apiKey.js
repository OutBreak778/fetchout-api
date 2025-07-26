import ApiEndpoint from "../models/apiEndpoint.js";
import logger from "../utils/logger.js";

export async function apiKey(req, res, next) {
  try {
    const { slug } = req.params;

    // Fetch the endpoint by slug
    const endpoint = await ApiEndpoint.findOne({ slug });
    if (!endpoint) {
      logger.warn(`API Key Middleware: No endpoint found for slug "${slug}"`);
      return res.status(404).json({
        success: false,
        message: "API endpoint not found.",
      });
    }

    // If endpoint is public, no key check needed
    if (endpoint.isPublic === true) {
      logger.info(`Endpoint "${slug}" is public. Skipping API key check.`);
      return next();
    }

    // Check for API key in headers
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
      logger.warn(`API Key Middleware: Missing API key for private endpoint "${slug}"`);
      return res.status(401).json({
        success: false,
        message: "Missing API key. Access denied.",
      });
    }

    // Validate the API key
    if (apiKey !== endpoint.apiKey) {
      logger.warn(`API Key Middleware: Invalid API key for endpoint "${slug}"`);
      return res.status(403).json({
        success: false,
        message: "Invalid API key. Access forbidden.",
      });
    }

    logger.info(`API key validated for private endpoint "${slug}"`);
    return next();

  } catch (error) {
    logger.error(`API Key Middleware Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
