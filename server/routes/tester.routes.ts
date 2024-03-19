import express from "express";
const router = express.Router();

import {
  getTester,
  getAllTester,
  getTesterById,
} from "../controllers/tester.controller";
import { checkTester } from "../middlewares/checkUserRole";

router.get("/:id", checkTester, getTesterById);
router.post("/", checkTester, getTester); // Get a specific tester by email
router.get("/all", checkTester, getAllTester); // Get all testers

module.exports = router;
