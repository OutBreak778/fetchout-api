import mongoose from "mongoose";
const Schema = mongoose.Schema;

const apiEndpointSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    methods: {
      type: String,
      enum: ["GET", "POST", "PUT", "DELETE"],
      default: "GET",
    },
    slug: {
      type: String,
      unique: true,
    },
    params: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
    response: {
      type: Schema.Types.Mixed,
      required: true,
    },
    urlPath: {
      type: String,
      required: true,
      unique: true
    },
    apiKey: {
      type: String,
      required: true,
      unique: true,
    },
    hits: {
      type: Number,
      default: 0,
    },
    rateLimit: {
      limit: {
        type: Number,
        default: 2,
      },
      period: {
        type: Number,
        default: 60 * 1000,
      }
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ApiEndpoint = mongoose.model("apiEndpoint", apiEndpointSchema);
export default ApiEndpoint;
