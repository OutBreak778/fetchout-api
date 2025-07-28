import express from "express"
import { isUserVerify } from "../middleware/isUserVerify.js"
import { dashboardController } from "../controllers/dashboard/dashboardController.js"
const router = express.Router()

router.get("/", isUserVerify, dashboardController)

export default router