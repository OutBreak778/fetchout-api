import ApiEndpoint from "../models/apiEndpoint.js";
import logger from "../utils/logger.js";

const rateLimitStore = new Map()

export async function endpointRateLimiter(req, res, next) {
  const { slug } = req.params;
  const userId = req.user._id;
  try {
    const endpoint = await ApiEndpoint.findOne({ slug });
    if (!endpoint) {
      logger.warn("Endpoint is Required");
      return res.status(404).json({
        success: false,
        message: "Invalid or Expired Endpoint",
      });
    }

    const {rateLimit} = endpoint

    const limit = rateLimit.limit || 7
    const period = rateLimit.period || 60000

    const key = `${slug}:${userId}`
    const currentTime = Date.now()

    const entry = rateLimitStore.get(key)
    if(!entry) {
        rateLimitStore.set(key,{
            count: 1,
            startTime: currentTime
        })
        return next()
    }

    const timepassed = currentTime - entry.startTime
    if(timepassed < period) {
        if(entry.count < limit) {
            entry.count += 1
            rateLimitStore.set(key, entry)
            return next()
        } else {
            logger.warn(`Rate Limit is exceeded for user: ${userId} on endpoint ${slug}`)
            return res.status(429).json({
                success: false,
                message: "Rate Limited Exceeded! Try again later."
            })
        }
    } else {
        rateLimitStore.set(key, {
            count: 0,
            startTime: currentTime
        })
        return next()
    }

  } catch (error) {
    logger.error(`Error Occurred: ${error.message}`);
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
