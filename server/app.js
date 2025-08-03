import express from "express"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

import routes from "./routes/index.js"
import errorHandler from "./middleware/errorHandler.js"
import authRoutes from "./routes/authRoutes.js"
import apiEndpointRoutes from "./routes/apiEndpointRoute.js"
import usageLogRoutes from "./routes/usageLogRoute.js"
import paramsRoutes from "./routes/paramsRoute.js"
import dashboardRoutes from "./routes/dashboardRoute.js"
import userRoutes from "./routes/userRoute.js"

dotenv.config({quiet: true})
const app = express()

// Middleware
app.use(helmet())
app.use(morgan("dev"))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())

//Routes
app.use("/api/v1", routes)
app.use("/auth", authRoutes)
app.use("/auth/user", userRoutes)
app.use("/api/endpoint", apiEndpointRoutes)
app.use("/api/usage-log", usageLogRoutes)
app.use("/api", paramsRoutes)
app.use("/dashboard", dashboardRoutes)

//Errors
app.use(errorHandler)

export default app