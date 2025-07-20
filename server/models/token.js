import mongoose from "mongoose";
const Schema = mongoose.Schema

const tokenSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600
    }
})

const Token = mongoose.model("token", tokenSchema)
export default Token