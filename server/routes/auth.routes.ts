import express from "express";
import {
  getUser,
  registerCustomer,
  loginCustomer,
  updateCustomer,
  sendOtp,
  verifyOtp,
  checkVerified,
  logout,
} from "../controllers/auth.controller";
import {
  checkAllValidUsers,
  checkCustomer,
} from "../middlewares/checkUserRole";
const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.put("/updatecustomer", checkCustomer, updateCustomer);
router.post("/getcustomer", getUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/checkVerified", checkVerified);
router.get("/logout", checkAllValidUsers, logout);

module.exports = router;
