import mongoose from "mongoose"
const Schema = mongoose.Schema

const usageLogSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    endpointId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "apiEndpoint",
        required: true,
    },
    ipAddress: {
        type: String,
    },
    statusCode: {
        type: Number,
        default: 200
    },
    responseTime: {
        type: Number,
    },
    urlPath: {
        type: String,
    }
}, {timestamps: true})

const UsageModel = mongoose.model('usageLog', usageLogSchema)
export default UsageModel