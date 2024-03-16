import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { UserModel } from "./models/UserModel";

config({ path: ".env" });
const port = process.env.PORT || 9000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_PORT,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Database Connection
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

app.get("/healthCheck", (req, res) => {
  try {
    res.status(200).send({ message: "done" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ err: error.message });
  }
});

app.get("/api/me", async (req, res) => {
  try {
    if (req.cookies.bugTracker) {
      const data = jwt.verify(
        req.cookies.bugTracker,
        process.env.JWT_SECRET_KEY as string
      ) as jwt.JwtPayload;

      const userData = await UserModel.findOne({
        email: data.email,
        isVerified: true,
      });

      if (userData) {
        // omits password and additonal details
        const { password, ...user } = userData.toJSON();
        return res.status(200).send(user);
      }
      return res.status(200).send({ message: "unauthorized" });
    }

    return res.status(200).send({ message: "cookie not found" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ err: error.message });
  }
});

// Router
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/test-request", require("./routes/test-request.routes"));
app.use("/api/bug", require("./routes/bug.routes"));
app.use("/api/notification", require("./routes/notification.routes"));
app.use("/api/tester",require("./routes/tester.routes"));
app.use("/api/product-manager",require("./routes/product-manager.routes"));

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
