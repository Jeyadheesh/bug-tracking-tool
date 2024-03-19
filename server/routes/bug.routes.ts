import express from "express";
const router = express.Router();
import {
  createBug,
  getAllBug,
  getBugById,
  updateBugStatus,
  updateBugDetails,
  getAllBugOfTestRequest,
} from "../controllers/bug.controller";
import {
  checkAllValidUsers,
  checkTester,
  checkTesterAndCustomer,
} from "../middlewares/checkUserRole";

router.post("/", checkTester, createBug); //
router.patch("/", checkTesterAndCustomer, updateBugStatus);
router.patch("/edit-details", checkTesterAndCustomer, updateBugDetails);
router.get("/test-request/:id", checkAllValidUsers, getAllBugOfTestRequest);
router.get("/:id", checkAllValidUsers, getBugById);
router.get("/", checkAllValidUsers, getAllBug);

module.exports = router;
