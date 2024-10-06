const Order = require("../models/orderModel");
const User = require("../models/userModel");
module.exports = {
  placeOrder: async (req, res) => {
    const { items, userId, totalPrice, status } = req.body;

    try {
      var newUser = await User.findById(userId);
      const newOrder = new Order({
        items,
        user: newUser,
        totalPrice,
        status,
      });

      await newOrder.save();

      res.status(200).json({ message: "Order placed successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Error placing order" });
    }
  },
  getOrder: async (req, res) => {
    try {
      const orders = await Order.find();

      return res.send({
        response: orders,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },

  //   getItemById: async (req, res) => {
  //     try {
  //       console.log("Request Params:", req.query);
  //       const items = await item.findById(req.query.id);

  //       return res.send({
  //         response: items,
  //       });
  //     } catch (error) {
  //       return res.send({
  //         message: error.message,
  //       });
  //     }
  //   },
  //   updateItem: async (req, res) => {
  //     try {
  //       const items = await item.findById(req.query.id);
  //       const validate = await updateItemSchema.validateAsync(req.body);
  //       var itemUpdated;
  //       if (items) {
  //         itemUpdated = await item.updateOne(validate);
  //       }
  //       if (itemUpdated.error) {
  //         return res.send({
  //           message: itemUpdated.error,
  //         });
  //       }
  //       return res.send({
  //         message: "Item updated successfully",
  //         response: itemUpdated,
  //       });
  //     } catch (error) {
  //       return res.send({
  //         message: error.message,
  //       });
  //     }
  //   },
  deleteOrder: async (req, res) => {
    try {
      const orders = await Order.findByIdAndDelete(req.params.id);
      if (!orders) {
        return res.status(404).send("Order not found");
      }

      res.status(200).send("Order deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  },
};
