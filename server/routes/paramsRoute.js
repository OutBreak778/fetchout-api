import express from "express"
import {isUserVerify} from "../middleware/isUserVerify.js"
import { paramsController } from "../controllers/params/paramsController.js"
import { apiKey } from "../middleware/apiKey.js"
import {authLimiter} from "../middleware/authLimiter.js"
// import { isEndpointVerify } from "../middleware/isEndpointVerify.js"
import { usageLog } from "../middleware/usageLog.js"
// import { getSingleEndpointController } from "../controllers/apiEndpoint/getEndpointController.js"

const router = express.Router()

router.all("/:slug", isUserVerify, apiKey, usageLog, authLimiter, paramsController)
// router.all("/:slug/:apiKey", isUserVerify, isEndpointVerify, usageLog, getSingleEndpointController)


export default router