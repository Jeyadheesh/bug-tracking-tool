import mongoose from "mongoose";

const BugSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    comments: {
      type: [
        {
          name: String,
          image: String,
          message: String,
          status: String,
        },
      ],
      default: [],
    },
    testRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestRequestModel",
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    priority: String,
    images: {
      type: [String],
    },
    summary: String,
    feature: String,
    stepsToReproduce: String,
  },
  {
    timestamps: true,
  }
);

export const BugModel = mongoose.model("BugModel", BugSchema);
