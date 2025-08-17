import ApiEndpoint from "../../models/apiEndpoint.js";
import logger from "../../utils/logger.js";

export async function paramsController(req, res) {
  const { slug } = req.params;
  try {
    const endpoint = await ApiEndpoint.findOne({ slug });
    if (!endpoint) {
      logger.warn("No Endpoint provided");
      return res.status(404).json({
        success: false,
        message: "Endpoint error occurred",
      });
    }

    const method = req.method.toUpperCase();
    const expectedMethod = endpoint.methods.toUpperCase();

    if (method !== expectedMethod) {
      return res.status(405).json({
        success: false,
        message: `Method Not Allowed. Use ${expectedMethod}`,
      });
    }

    // Extract filters from correct place
    const filters = method === "GET" ? req.query : req.body;
    const rawResponse = endpoint.response;

    let filteredResponse = [];

    // Case 1: Response is an array
    if (Array.isArray(rawResponse)) {
      filteredResponse = rawResponse.filter((item) => {
        // If item has fields[], flatten them for filtering
        const flatItem = item.fields
          ? item.fields.reduce((acc, f) => ({ ...acc, [f.key]: f.value }), {})
          : item;

        return Object.entries(filters).every(([key, value]) => {
          if (typeof flatItem[key] === "string") {
            return flatItem[key].toLowerCase() === value.toLowerCase();
          }
          return flatItem[key] == value;
        });
      });
    } else if (typeof rawResponse === "object" && rawResponse !== null) {
      const match = Object.entries(filters).every(([key, value]) => {
        if (!(key in rawResponse)) return false;

        if (typeof rawResponse[key] === "string") {
          return rawResponse[key].toLowerCase() === value.toLowerCase();
        }

        return rawResponse[key] == value;
      });

      filteredResponse = match ? [rawResponse] : [];
    }

    return res.status(200).json({
      success: true,
      message: "Filtered Response: ",
      count: filteredResponse.length,
      data: filteredResponse,
    });
  } catch (error) {
    logger.error(`Get Params Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
