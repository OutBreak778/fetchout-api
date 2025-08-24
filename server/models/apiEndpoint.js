import mongoose from "mongoose";
import UsageModel from "./usageLog.js";
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
      required: false,
      unique: true,
    },
    apiKey: {
      type: String,
      required: false,
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
      },
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

apiEndpointSchema.pre("remove", async function (next) {
  await UsageModel.deleteMany({ endpointId: this._id });
  next();
});

apiEndpointSchema.pre(
  "deleteOne",
  { document: false, query: true },
  async function (next) {
    const query = this.getQuery();
    if (query._id) {
      await UsageModel.deleteMany({ endpointId: query._id });
    }
    next();
  }
);

const ApiEndpoint = mongoose.model("apiEndpoint", apiEndpointSchema);
export default ApiEndpoint;
