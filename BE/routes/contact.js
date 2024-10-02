const express = require("express");
const {
  saveFeedback,
  getFeedback,
  deleteFeedback,
} = require("../controller/contactController");
const router = express.Router();

router.post("/createFeedback", saveFeedback);
router.get("/getFeedback", getFeedback);
router.delete("/deleteFeedback/:id", deleteFeedback);

module.exports = router;
