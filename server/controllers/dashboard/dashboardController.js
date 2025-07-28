import mongoose from "mongoose";
import ApiEndpoint from "../../models/apiEndpoint.js";
import UsageModel from "../../models/usageLog.js";
import logger from "../../utils/logger.js";

export async function dashboardController(req, res) {
  const userId = req.user._id;
  try {
    const [
      TotalRequest,
      AvgResponseTime,
      requestPerEndpoint,
      requestTrends,
      successErrorRatio,
      top5Trends,
      recentUsageLogs,
      allStatusCode
    ] = await Promise.all([
      // 1. Total Endpoint's usage-log request
      UsageModel.countDocuments({ userId }),

      // 2. Average Response time value
      UsageModel.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        {
          $group: {
            _id: null,
            responseTime: { $avg: "$responseTime" },
          },
        },
      ]),

      //3. Total request Per endpoint
      UsageModel.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: "$endpointId",
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),

      //4. Request Trends over few days
      UsageModel.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            countEndpoint: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      // 5. Success to Error Ratio
      UsageModel.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: {
              $cond: [
                {
                  $and: [
                    { $gte: ["$statusCode", 200] },
                    { $lt: ["$statusCode", 500] },
                  ],
                },
                "success",
                "error",
              ],
            },
            count: { $sum: 1 },
          },
        },
      ]),

      // 6. Top 5 trends
      UsageModel.aggregate([
        { $match: { userId } },
        { $group: { _id: "$endpointId", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),

      // 7. Recent Usage Logs
      UsageModel.find({ userId })
        .sort({ createdAt: -1 })
        .limit(10)
        .select("urlPath statusCode responseTime"),

      // 8. Status Code Distribution
      UsageModel.aggregate([
        {$match: {userId}},
        {$group: {_id: "$statusCode", count: {$sum: 1}}},
        {$sort: {_id: 1}}
      ])
    
    ]);

    const endpoint = await ApiEndpoint.find({ userId }).select(
      "userId name description urlPAth slug apiKey"
    );

    if (!endpoint) {
      logger.warn("No data found in dashboard controller");
      return res.status(404).json({
        success: false,
        message: "something went wrong! Error.",
      });
    }

    const data = {
      TotalRequest,
      AvgResponseTime,
      requestPerEndpoint,
      requestTrends,
      successErrorRatio,
      top5Trends,
      recentUsageLogs,
      allStatusCode
    };

    logger.info("This is dashboard");
    return res.status(200).json({
      success: true,
      message: "Dashboard page is authenticated",
      data,
    });
  } catch (error) {
    logger.error(`Get Usage Logs Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
