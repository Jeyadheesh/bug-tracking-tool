import express from "express";
import {
  createNotification,
  getByReceiverId,
  updateIsSeen,
} from "../controllers/notification.controller";
const router = express.Router();

router.post("/create", createNotification);
router.get("/getByReceiverId/:receiverId", getByReceiverId);
router.patch("/updateIsSeen", updateIsSeen);

module.exports = router;
