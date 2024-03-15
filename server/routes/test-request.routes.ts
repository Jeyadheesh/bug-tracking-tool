import express from "express";
const router = express.Router();
import {
  createTestRequest,
  deleteTestRequest,
  getAllTestRequest,
  getTestRequestById,
  updateTestRequestDetails,
  updateTestRequestStatus,
} from "../controllers/test-request.controller";

router.post("/", createTestRequest);
router.patch("/", updateTestRequestStatus);
router.patch("/edit-details", updateTestRequestDetails);
router.get("/:id", getTestRequestById);
router.get("/", getAllTestRequest);
router.delete("/:id", deleteTestRequest);

module.exports = router;
