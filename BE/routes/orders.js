const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getOrder,
  deleteOrder,
} = require("../controller/orderController");

router.post("/placeOrder", placeOrder);
router.get("/getAllOrders", getOrder);
router.delete("/deleteorder/:id", deleteOrder);
module.exports = router;
