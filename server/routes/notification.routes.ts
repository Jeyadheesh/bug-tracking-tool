import express from "express";
import {
  createNotification,
  getByReceiverId,
  updateIsSeen,
  updateIsSeenAll,
} from "../controllers/notification.controller";
const router = express.Router();

router.post("/create", createNotification);
router.get("/getByReceiverId/:receiverId", getByReceiverId);
router.patch("/updateIsSeen", updateIsSeen);
router.patch("/updateIsSeenAll", updateIsSeenAll);

module.exports = router;
