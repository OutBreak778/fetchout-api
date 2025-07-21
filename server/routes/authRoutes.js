import express from "express"
import { loginAuthController, registerAuthController } from "../controllers/AuthController.js"
import { isEmailVerify } from "../middleware/isEmailVerify.js"
import { authLimiter } from "../middleware/authLimiter.js"

const router = express.Router()

//Register Routes
router.post("/register", authLimiter, registerAuthController)

router.get("/verify-email", isEmailVerify)

// Login Routes
router.post("/login", authLimiter, loginAuthController)

export default router