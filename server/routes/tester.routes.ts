import express from "express";
const router = express.Router();

import {
  getTester,
  getAllTester,
  getTesterById,

} from "../controllers/tester.controller";

router.get("/:id", getTesterById);
router.post("/", getTester); // Get a specific tester by email
router.get("/all", getAllTester); // Get all testers


module.exports = router;