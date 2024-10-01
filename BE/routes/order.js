var express = require("express");
var router = express.Router();

router.post("/placeorder", createItem);
router.get("/getallItems", getItems);
router.get("/getItem/:id", getItemById);
router.put("/updateItem/:id", updateItem);
router.delete("/deleteItem/:id", deleteItem);

module.exports = router;
