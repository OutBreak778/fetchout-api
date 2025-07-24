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
app.use("/api", routes)
app.use("/auth", authRoutes)
app.use("/api/endpoint", apiEndpointRoutes)
app.use("/api/usage-log", usageLogRoutes)
//Errors
app.use(errorHandler)

export default app