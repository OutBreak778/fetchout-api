import express from "express"
import { isUserVerify } from "../middleware/isUserVerify.js"
import { createEndpointController } from "../controllers/apiEndpoint/createEndpointController.js"
import { getAllEndpointController, getSingleEndpointController } from "../controllers/apiEndpoint/getEndpointController.js"
import { deleteEndpointController } from "../controllers/apiEndpoint/deleteEndpointController.js"
import { updateEndpointController } from "../controllers/apiEndpoint/updateEndpointController.js"
import { endpointRateLimiter } from "../middleware/endpointLimiter.js"
import { isEndpointVerify } from "../middleware/isEndpointVerify.js"
import { usageLog } from "../middleware/usageLog.js"

const router = express.Router()

router.post("/create-api", isUserVerify, createEndpointController)
router.get("/fetch-api", isUserVerify, getAllEndpointController)
router.get("/fetch-api/:slug", isUserVerify, endpointRateLimiter, getSingleEndpointController)
router.delete("/delete-api/:slug", isUserVerify, deleteEndpointController)
router.patch("/update-api/:slug", isUserVerify, updateEndpointController)

router.get("/:slug/:apiKey", isUserVerify, isEndpointVerify, usageLog, getSingleEndpointController)

export default router