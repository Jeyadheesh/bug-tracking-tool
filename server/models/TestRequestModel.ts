import mongoose from "mongoose";
import { UserType } from "./UserModel";

export interface TestRequestType extends mongoose.Document {
  name: string;
  url: string;
  projectManagerId?: mongoose.Types.ObjectId | UserType;
  testerId?: mongoose.Types.ObjectId | UserType;
  status: string;
  comments: {
    name: string;
    image: string;
    message: string;
    status: string;
  }[];
  credentials?: {
    email: string;
    password: string;
  };
  clientId: mongoose.Types.ObjectId | UserType;
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

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
      // required: true,
      default: "under review",
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
    credentials: {
      type: {
        email: String,
        password: String,
      },
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      // required: true,
    },
    summary: String,
  },
  {
    timestamps: true,
  }
);
// export const TestRequestType = typeof TestRequestSchema;
export const TestRequestModel = mongoose.model<TestRequestType>(
  "TestRequestModel",
  TestRequestSchema
);
