import express from "express";
import { isUserVerify } from "../middleware/isUserVerify.js"

import { userController } from "../controllers/user/userController.js";
const router = express.Router()

router.get("/", isUserVerify, userController)

export default router