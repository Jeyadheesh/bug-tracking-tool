import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { MainInFormal } from "./utils/nodeMailer";
import { config } from "dotenv";

config({ path: ".env" });
const port = process.env.PORT || 9000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_PORT,
    methods: "*",
  })
);

app.get("/healthCheck", (req, res) => {
  try {
    res.status(200).send({ result: "done" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ err: error.message });
  }
});

app.get("/me", (req, res) => {
  try {
    res.status(200).send({ result: "done" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ err: error.message });
  }
});

const connectToDB = async () => {
  try {
    // console.log(process.env.ATLAS_URL);
    await mongoose.connect(process.env.ATLAS_URL as string);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Not Connected :", error.message);
  }
};
connectToDB();

// Router
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/test-request", require("./routes/test-request.routes"));
app.use("/api/bug", require("./routes/bug.routes"));

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
