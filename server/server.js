import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
import ConnectToDB from "./config/db.js";
import logger from "./utils/logger.js";
import mongoose from "mongoose"
import { PORT } from "./config/constants.js";

dotenv.config({ quiet: true });
const server = http.createServer(app);

process.on("uncaughtException", (err) => {
  logger.error(`💥 Uncaught Exception: ${err.message}`);
  logger.error(err.stack);
  process.exit(1);
});

const startServer = async () => {
  try {
    await ConnectToDB();
    server.listen(PORT, "0.0.0.0", () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(`Something went wrong from Server: ${error.message}`);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
    logger.error(`Uncaught Handle Rejection: ${err.message}`)
    logger.error(err.stack)
    process.exit(1)
})

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)

async function shutdown() {
    logger.warn("Trying to shutdown the Server gracefully...")
    try {
        server.close(() => {
            logger.info("HTTP Server Closed")
        })

        await mongoose.connection.exit()
        logger.info("Connection closed Successfully")
        process.exit(0)

        
    } catch (error) {
        logger.error(`Error occurred, Exiting the Server...`)
        process.exit(1)
    }
}

startServer();
