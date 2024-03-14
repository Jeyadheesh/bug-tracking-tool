import express from "express";
import {
  getCustomer,
  registerCustomer,
  loginCustomer,
  test,
  updateCustomer,
} from "../controllers/auth.controller";
import { checkCustomer } from "../middlewares/checkUserRole";
const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.put("/updatecustomer", updateCustomer);
router.post("/getcustomer", getCustomer);
router.get("/test", checkCustomer, test);

module.exports = router;
