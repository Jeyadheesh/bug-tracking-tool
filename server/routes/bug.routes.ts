import express from "express";
const router = express.Router();
import {
  createBug,
  deleteBug,
  getAllBug,
  getBugById,
  updateBugStatus,
  updateBugDetails,
  getAllBugOfTestRequest,
} from "../controllers/bug.controller";

router.post("/", createBug);
router.patch("/", updateBugStatus);
router.patch("/edit-details", updateBugDetails);
router.get("/test-request/:id", getAllBugOfTestRequest);
router.get("/:id", getBugById);
router.get("/", getAllBug);
router.delete("/:id", deleteBug);

module.exports = router;
