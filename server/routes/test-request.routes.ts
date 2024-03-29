import express from "express";
const router = express.Router();
import {
  createTestRequest,
  getAllTestRequest,
  getTestRequestById,
  updateTestRequestDetails,
  updateTestRequestStatus,
} from "../controllers/test-request.controller";
import {
  checkAllValidUsers,
  checkCustomer,
  checkProjectManager,
} from "../middlewares/checkUserRole";

router.post("/", checkCustomer, createTestRequest);
router.patch("/", checkProjectManager, updateTestRequestStatus);
router.patch("/edit-details", checkProjectManager, updateTestRequestDetails);
router.get("/:id", checkAllValidUsers, getTestRequestById);
router.get("/", checkAllValidUsers, getAllTestRequest);

module.exports = router;
