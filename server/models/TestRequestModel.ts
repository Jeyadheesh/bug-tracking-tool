import mongoose from "mongoose";

const TestRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    projectManagerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    }, // opt
    testerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    status: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    credientials: {
      type: {
        email: String,
        password: String,
      },
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
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
