import slugify from "slugify";
import { CLIENT_URL } from "../../config/constants.js";
import ApiEndpoint from "../../models/apiEndpoint.js";
import logger from "../../utils/logger.js";
import crypto from "crypto";

const generateApiKey = () => {
  return "ptfo_" + crypto.randomBytes(16).toString("hex");
};

export async function createEndpointController(req, res) {
  const { name, methods, params, response, description, rateLimit, isPublic } = req.body;

  if (!name || !methods || !params || !Array.isArray(params)) {
    logger.warn("All fields are required.");
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  if (!["GET", "POST", "PUT", "DELETE"].includes(methods)) {
    logger.warn("Invalid HTTP Methods.");
    return res.status(400).json({
      success: false,
      message: "Invalid HTTP methods provided.",
    });
  }
  if ((rateLimit && typeof rateLimit.limit !== "number") || !rateLimit.period) {
    logger.warn("Invalid Rate Limit");
    return res.status(400).json({
      success: false,
      message: "Invalid Rate Limit.",
    });
  }

  if (!response || typeof response !== "object") {
    return res
      .status(400)
      .json({ success: false, message: "Response must be a JSON object." });
  }

  try {
    const userId = req.user._id;
    const apiKey = generateApiKey();
    let slugData = slugify(
      name,
      { lower: true }) || crypto.randomBytes(16).toString("hex")

    const existingName = await ApiEndpoint.findOne({userId, name})
    const existingSlug = await ApiEndpoint.findOne({ slug: slugData });

    if(existingName) {
        logger.warn("This name of Endpoint already exists.")
        return res.status(400).json({
            success: false,
            message: "Change the Name, Endpoint with this name already Exists !"
        })
    }

    if (existingSlug) {
      slugData = `${slugData}-${new Date.now()}`;
    }

    const newEndpoint = new ApiEndpoint({
      userId: userId,
      name,
      slug: slugData,
      description,
      methods,
      params,
      response,
      apiKey,
      urlPath: `${CLIENT_URL}/api/${slugData}/${apiKey}`,
      hits: 0,
      rateLimit: rateLimit,
      isPublic
    });

    await newEndpoint.save();

    logger.info("New Endpoint Created Successfully");
    return res.status(201).json({
      success: true,
      message: "API endpointed Created!",
      endpoint: {
        name,
        url: `${CLIENT_URL}/api/${slugData}/${apiKey}`,
        apiKey,
        methods,
        params,
        rateLimit: rateLimit || { limit: 1000, period: "daily" },
        hits: 0,
      },
    });
  } catch (error) {
    logger.error(`Create Endpoint Controller Error occurred: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
