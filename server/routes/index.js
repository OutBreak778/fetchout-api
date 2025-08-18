import express from "express"
import logger from "../utils/logger.js"

const router = express.Router()

router.get("/health", (req, res) => {
    logger.info("This is health Data.")
    return res.status(200).json({
        status: "Ok",
        timestamp: new Date()
    })
})

export default router