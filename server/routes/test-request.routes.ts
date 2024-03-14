import express from "express";
const router = express.Router();
import {
  createTestRequest,
  deleteTestRequest,
  getAllTestRequest,
  getTestRequestById,
  updateTestRequest,
} from "../controllers/test-request.controller";

router.post("/", createTestRequest);
router.put("/", updateTestRequest);
router.get("/:id", getTestRequestById);
router.get("/", getAllTestRequest);
router.delete("/:id", deleteTestRequest);

module.exports = router;
