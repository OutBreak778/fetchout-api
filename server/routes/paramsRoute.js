import express from "express"
import {isUserVerify} from "../middleware/isUserVerify.js"
import { paramsController } from "../controllers/params/paramsController.js"
import { apiKey } from "../middleware/apiKey.js"
import {authLimiter} from "../middleware/authLimiter.js"

const router = express.Router()

router.all("/:slug", isUserVerify, apiKey, authLimiter, paramsController)

export default router