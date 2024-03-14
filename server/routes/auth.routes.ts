import express from "express";
import {
  getCustomer,
  registerCustomer,
  test,
  updateCustomer,
} from "../controllers/auth.controller";
import { customerCheck } from "../middlewares/checkUserRole";
const router = express.Router();

router.post("/register", registerCustomer);
router.put("/updatecustomer", updateCustomer);
router.post("/getcustomer", getCustomer);
router.get("/test", customerCheck, test);

module.exports = router;
