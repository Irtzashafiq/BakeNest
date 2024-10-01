const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    itemPrice: {
      type: String,
      required: true,
    },
    itemDescription: {
      type: String,
    },
    itemImage: {
      type: String,
      default: "user",
    },
    itemLike: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
