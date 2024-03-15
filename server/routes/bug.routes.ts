import express from "express";
const router = express.Router();
import {
  createBug,
  deleteBug,
  getAllBug,
  getBugById,
  updateBugStatus,
  updateBugDetails,
} from "../controllers/bug.controller";

router.post("/", createBug);
router.patch("/", updateBugStatus);
router.patch("/edit-details", updateBugDetails);
router.get("/:id", getBugById);
router.get("/", getAllBug);
router.delete("/:id", deleteBug);

module.exports = router;
