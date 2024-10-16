var express = require("express");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const {
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  createItem,
} = require("../controller/itemController");

var router = express.Router();

router.post("/createItem", upload.single("itemImage"), createItem);
router.get("/getallItems", getItems);
router.get("/getItem/:id", getItemById);
router.put("/updateItem/:id", updateItem);
router.delete("/deleteItem/:id", deleteItem);

module.exports = router;
