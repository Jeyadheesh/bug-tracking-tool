import express from "express";
import {
  getUser,
  registerCustomer,
  test,
  updateCustomer,
} from "../controllers/auth.controller";
import { checkCustomer } from "../middlewares/checkUserRole";
const router = express.Router();

router.post("/register", registerCustomer);
router.put("/updatecustomer", updateCustomer);
router.post("/getcustomer", getUser);
router.get("/test", checkCustomer, test);

module.exports = router;
