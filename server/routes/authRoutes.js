import express from "express"
import { loginAuthController, logoutAuthController, registerAuthController } from "../controllers/auth/AuthController.js"
import { isEmailVerify } from "../middleware/isEmailVerify.js"
import { authLimiter } from "../middleware/authLimiter.js"
import { isUserVerify } from "../middleware/isUserVerify.js"

const router = express.Router()

//Register Routes
router.post("/register", authLimiter, registerAuthController)

router.get("/verify-email", isEmailVerify)

// Login Routes
router.post("/login", authLimiter, loginAuthController)
router.post("/logout", logoutAuthController)

router.get("/dashboard", isUserVerify, (req, res) => {
    return res.status(201).json({
        success: true,
        message: "This is dashboard page"
    })
})

export default router