import mongoose from "mongoose";

const TestRequestSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    projectManagerId: String, // opt
    testerId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TestRequestModel = mongoose.model(
  "TestRequestModel",
  TestRequestSchema
);
