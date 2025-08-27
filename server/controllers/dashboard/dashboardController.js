import mongoose from "mongoose";
import ApiEndpoint from "../../models/apiEndpoint.js";
import UsageModel from "../../models/usageLog.js";
import logger from "../../utils/logger.js";
import moment from "moment";

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
      allStatusCode,
      totalRequestsThisWeek,
      totalRequestsLastWeek,
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
                    { $lt: ["$statusCode", 300] },
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
        .limit(5)
        .select("urlPath statusCode responseTime createdAt"),

      // 8. Status Code Distribution
      UsageModel.aggregate([
        { $match: { userId } },
        { $group: { _id: "$statusCode", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),

      //9. Total Request this week for trend up mark
      UsageModel.countDocuments({
        userId,
        createdAt: { $gte: moment().startOf("day").toDate() },
      }),

      // 10/ Total Request last week
      UsageModel.countDocuments({
        userId,
        createdAt: {
          $gte: moment().subtract(1, "days").startOf("day").toDate(),
          $lt: moment().startOf("day").toDate(),
        },
      }),
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

    
    // ----------------- TOTAL REQUEST -----------------
    const totalRequestsTrend =
      totalRequestsLastWeek > 0
        ? ((totalRequestsThisWeek - totalRequestsLastWeek) /
            totalRequestsLastWeek) *
          100
        : 0;

    // ----------------- AVG RESPONSE TIME -----------------
    const avgResponseTime = AvgResponseTime[0]?.responseTime || 0;
    // you need yesterday’s avg too, so compute it separately here
    const avgResponseYesterday = 120; // <-- run one more small query for yesterday
    const avgResponseTimeTrend =
      avgResponseYesterday > 0
        ? ((avgResponseTime - avgResponseYesterday) / avgResponseYesterday) *
          100
        : 0;

    // ----------------- SUCCESS RATE -----------------
    const success =
      successErrorRatio.find((r) => r._id === "success")?.count || 0;
    const error = successErrorRatio.find((r) => r._id === "error")?.count || 0;
    const total = success + error;
    const successRateToday = total > 0 ? (success / total) * 100 : 0;

    // same trick: get yesterday’s ratio with a separate tiny query
    const successRateYesterday = 75; // <— fetch yesterday
    const successRateTrend =
      successRateYesterday > 0
        ? ((successRateToday - successRateYesterday) / successRateYesterday) *
          100
        : 0;

    // ----------------- ACTIVE ENDPOINTS -----------------
    const activeEndpointsToday = requestPerEndpoint.length;
    // you also need yesterday’s distinct endpoint count:
    const activeEndpointsYesterday = 3; // <— fetch yesterday
    const totalEndpointTrend =
      activeEndpointsYesterday > 0
        ? ((activeEndpointsToday - activeEndpointsYesterday) /
            activeEndpointsYesterday) *
          100
        : 0;

    const data = {
      TotalRequest,
      AvgResponseTime,
      requestPerEndpoint,
      requestTrends,
      successErrorRatio,
      top5Trends,
      recentUsageLogs,
      allStatusCode,
      totalRequestsLastWeek,
      totalRequestsLastWeek,
      trends: {
        totalRequest: {
          percent: totalRequestsTrend.toFixed(2),
          up: totalRequestsTrend > 0,
        },
        avgResponseTime: {
          percent: avgResponseTimeTrend.toFixed(2),
          up: avgResponseTimeTrend < 0 ? false : true,
        },
        successRate: {
          percent: successRateTrend.toFixed(2),
          up: successRateTrend > 0,
        },
        activeEndpoint: {
          percent: totalEndpointTrend.toFixed(2),
          up: totalEndpointTrend > 0,
        },
      },
    };

    logger.info("This is dashboard");
    return res.status(200).json({
      success: true,
      message: "Dashboard page is authenticated",
      data,
    });
  } catch (error) {
    logger.error(`Get Dashboard Controller Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
