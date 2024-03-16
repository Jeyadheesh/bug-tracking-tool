import express from "express";
const router = express.Router();

import {
  getProductManagerById,
  getProductManager,
  getAllProductManager
} from "../controllers/product-manager.controller";


router.get("/:id", getProductManagerById);
router.post("/", getProductManager); // Get a specific PM by email
router.get("/all", getAllProductManager); // Get all PM

module.exports = router;