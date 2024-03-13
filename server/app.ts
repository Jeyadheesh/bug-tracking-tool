import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { MainInFormal } from "./lib/NodeMailer";
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

app.get("/getUsers", (req, res) => {
  try {
    res.send({ result: "done" });
  } catch (error) {
    console.log(error.message);
  }
});

async function checkConnection() {
  try {
    // console.log(process.env.ATLAS_URL);
    await mongoose.connect(process.env.ATLAS_URL as string);
    console.log("Connected");
  } catch (error) {
    console.log("Not Connected :", error.message);
  }
}
checkConnection();

// MainInFormal("jei", "njeyadheesh890@gmail.com");

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
