import express from "express";
const router = express.Router();
import {
  createBug,
  deleteBug,
  getAllBug,
  getBugById,
  updateBug,
} from "../controllers/bug.controller";

router.post("/", createBug);
router.put("/", updateBug);
router.get("/:id", getBugById);
router.get("/", getAllBug);
router.delete("/:id", deleteBug);

module.exports = router;
