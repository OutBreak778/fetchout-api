import express from "express"

const router = express.Router()

router.get("/health", (req, res) => {
    return res.status(200).json({
        status: "Ok",
        timestamp: new Date()
    })
})

export default router