import express from "express";
const router = express.Router();

router.get("", (req, res) => {
  try {
    // console.log("in");
    res.send("nice");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
