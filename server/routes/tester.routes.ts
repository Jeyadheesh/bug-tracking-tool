import express from "express";
const router = express.Router();

import {
  getTester,
  getAllTester,
  getTesterById,
  getFreeTesters,
} from "../controllers/tester.controller";
import { checkProjectManager, checkTester } from "../middlewares/checkUserRole";

router.get("/free-testers", checkProjectManager, getFreeTesters); // Get all free testers
router.get("/:id", getTesterById);
router.post("/", getTester); // Get a specific tester by email
router.get("/all", getAllTester); // Get all testers

module.exports = router;
