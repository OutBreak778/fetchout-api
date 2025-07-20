import express from "express"
import { loginAuthController, registerAuthController } from "../controllers/AuthController.js"

const router = express.Router()

//Register Routes
router.post("/register", registerAuthController)

// Login Routes
router.get("/login", loginAuthController)

export default router