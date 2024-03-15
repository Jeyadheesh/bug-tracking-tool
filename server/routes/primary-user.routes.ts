import express from "express";
const router = express.Router();

import {
  getTester,
  getAllTester,
  getTesterById,
  getProductManagerById,
  getProductManager,
  getAllProductManager
} from "../controllers/primary-user.controller";

router.get("/:id", getTesterById);
router.get("/", getTester); // Get a specific tester by email
router.get("/all", getAllTester); // Get all testers
router.get("/:id", getProductManagerById);
router.get("/", getProductManager); // Get a specific PM by email
router.get("/all", getAllProductManager); // Get all PM

module.exports = router;