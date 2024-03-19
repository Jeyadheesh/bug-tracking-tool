import express from "express";
const router = express.Router();

import {
  getProductManagerById,
  getProductManager,
  getAllProductManager,
} from "../controllers/product-manager.controller";
import { checkProjectManager } from "../middlewares/checkUserRole";

router.get("/:id", checkProjectManager, getProductManagerById);
router.post("/", checkProjectManager, getProductManager); // Get a specific PM by email
router.get("/all", checkProjectManager, getAllProductManager); // Get all PM

module.exports = router;
