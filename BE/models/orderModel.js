const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    item: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    Payments: {
      type: String,
      enum: ["COD", "Online"],
    },
    Buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Status: {
      type: String,
      enum: ["preparing", "prepared", "on the way", "Delivered"],
      default: "preparing",
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Order", OrderSchema);

module.exports = Order;
