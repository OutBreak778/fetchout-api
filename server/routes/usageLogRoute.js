import express from "express";
import { isUserVerify } from "../middleware/isUserVerify.js";
import {
  getAllUsageLogController,
  getSingleUsageController,
} from "../controllers/usageLog/getUsageLogController.js";

const router = express.Router();

router.get("/", isUserVerify, getAllUsageLogController);
router.get("/:slug", isUserVerify, getSingleUsageController);

export default router;
