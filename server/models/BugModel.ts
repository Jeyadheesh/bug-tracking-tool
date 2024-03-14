import mongoose from "mongoose";

const BugSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    testRequestId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    priority: String, // opt
    image: String, // opt
  },
  {
    timestamps: true,
  }
);

export const BugModel = mongoose.model("BugModel", BugSchema);
