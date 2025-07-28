import ApiEndpoint from "../../models/apiEndpoint.js";
import logger from "../../utils/logger.js";

export async function getAllEndpointController(req, res) {
  try {
    const data = await ApiEndpoint.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    logger.info("This is the All route Endpoints");

    return res.status(200).json({
      success: true,
      message: "All route Endpoints",
      count: data.length,
      endpoint: data,
    });
  } catch (error) {
    logger.error("Internal Server Error");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
export async function getSingleEndpointController(req, res) {
  const { slug } = req.params;

  try {
    const endpoint = await ApiEndpoint.findOne({ slug });
    if (!endpoint) {
      logger.warn(`No endpoint found for slug: ${slug}`);
      return res.status(404).json({
        success: false,
        message: "Endpoint not found",
      });
    }

    if (endpoint.methods.toUpperCase() !== req.method.toUpperCase()) {
      return res.status(405).json({
        success: false,
        message: `Invalid HTTP method. Expected ${endpoint.methods}, got ${req.method}`,
      });
    }

    endpoint.hits += 1;
    await endpoint.save();

    let responseData;
    try {
      responseData = JSON.parse(endpoint.response);
    } catch (e) {
      responseData = endpoint.response;
    }

    logger.info(`Served mock response for slug: ${slug}`);
    return res.status(200).json({
      success: true,
      message: "Found the Endpoint API",
      endpoint: {
        _id: endpoint._id,
        userId: req.user._id,
        name: endpoint.name,
        description: endpoint.description,
        methods: endpoint.methods,
        urlPath: endpoint.urlPath,
        slug: endpoint.slug,
        params: endpoint.params,
        response: responseData,
        hits: endpoint.hits,
        rateLimit: endpoint.rateLimit,
        isPublic: endpoint.isPublic,
      },
    });
  } catch (error) {
    logger.error("Internal Server Error");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
// issue in getSingleEndpointController, as we change the params, if not there it should add the params but it delete the previous and add the new params
