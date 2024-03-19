import express from "express";
import {
  getByReceiverId,
  updateIsSeen,
  updateIsSeenAll,
} from "../controllers/notification.controller";
import { checkAllValidUsers } from "../middlewares/checkUserRole";
const router = express.Router();

router.get("/getByReceiverId/:receiverId", checkAllValidUsers, getByReceiverId);
router.patch("/updateIsSeen", checkAllValidUsers, updateIsSeen);
router.patch("/updateIsSeenAll", checkAllValidUsers, updateIsSeenAll);

module.exports = router;
