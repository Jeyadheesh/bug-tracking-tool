import mongoose, { Types } from "mongoose";
import { resolveProjectReferencePath } from "typescript";
import { TestRequestType } from "./TestRequestModel";

export interface BugType extends mongoose.Document {
  name: string;
  comments: {
    name: string;
    image: string;
    message: string;
    status: string;
  }[];
  testRequestId: mongoose.Types.ObjectId | TestRequestType;
  status: string;
  priority?: string;
  images?: string[];
  summary?: string;
  feature?: string;
  stepsToReproduce?: string;
  createdAt: Date;
  updatedAt: Date;
}

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

export const BugModel = mongoose.model<BugType>("BugModel", BugSchema);
