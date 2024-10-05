const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    items: Array,
    totalPrice: {
      type: Number,
      required: true,
    },

    user: Object,
    status: {
      type: String,
      enum: ["COD", "Online"],
      default: "COD",
    },
    action: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
