import express from "express";
import {
  getUser,
  registerCustomer,
  loginCustomer,
  test,
  updateCustomer,
  sendOtp,
  verifyOtp,
} from "../controllers/auth.controller";
import { checkCustomer } from "../middlewares/checkUserRole";
const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.put("/updatecustomer", updateCustomer);
router.post("/getcustomer", getUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/test", checkCustomer, test);

module.exports = router;
