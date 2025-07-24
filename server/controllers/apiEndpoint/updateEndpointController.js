import slugify from "slugify";
import ApiEndpoint from "../../models/apiEndpoint.js";
import logger from "../../utils/logger.js";

export async function updateEndpointController(req, res) {
  const { slug } = req.params;
  const updateData = req.body;
  const userId = req.user._id;

  if (!userId) {
    logger.warn(`No User Id found to Update`);
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  try {
    const endpoint = await ApiEndpoint.findOne({ slug });

    if (!endpoint) {
      logger.warn(`No endpoint found for slug: ${slug}`);
      return res.status(404).json({
        success: false,
        message: "Endpoint not found",
      });
    }
    const isValid = endpoint.userId.toString() == req.user._id
    if (!isValid) {
      logger.warn(`Unauthorized access to update the Endpoint`);
      return res.status(403).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    
    if(updateData.name !== undefined) {
        endpoint.name = updateData.name
        endpoint.slug = slugify(updateData.name, {lower: true}) 
    }

    if(updateData.description !== undefined) {
        endpoint.description = updateData.description
    }
    
    if (updateData.methods !== undefined) {
      endpoint.methods = updateData.methods;
    }

    if (updateData.params !== undefined) {
      endpoint.params = updateData.params;
    }

    if (updateData.response !== undefined) {
      endpoint.response = updateData.response;
    }

    if (updateData.rateLimit !== undefined) {
      endpoint.rateLimit = updateData.rateLimit;
    }

    if(updateData.hits !== undefined) {
      endpoint.hits = updateData.hits
    }

    if(updateData.isPublic !== undefined) {
      endpoint.isPublic = updateData.isPublic
    }

    await endpoint.save();

    logger.info("Endpoint Updated Successfully");
    return res.status(200).json({
      success: true,
      message: "Endpoint Updated Successfully",
      updateData,
    });
  } catch (error) {
    logger.error("Internal Server Error");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
