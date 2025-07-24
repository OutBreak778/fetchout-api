import ApiEndpoint from "../../models/apiEndpoint.js";
import logger from "../../utils/logger.js";

export async function deleteEndpointController(req, res) {
  const {slug} = req.params
    try {
    const userId = req.user._id
    const endpoint = await ApiEndpoint.findOne({slug})
        
    if (!endpoint) {
      logger.warn(`No endpoint found for slug: ${slug}`);
      return res.status(404).json({
        success: false,
        message: "Endpoint not found",
      });
    }

    await ApiEndpoint.deleteOne({slug, userId})

    return res.status(200).json({
        success: true,
        message: "Endpoint deleted Successfully"
    })

  } catch (error) {
    logger.error("Internal Server Error");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
