const Order = require("../models/orderModel");

module.exports = {
  placeOrder: async (req, res) => {
    const { cartItems, userId, totalPrice,  } = req.body;

    try {
      const newOrder = new Order({
        items: cartItems,
        user: userId,
        totalPrice,
        status: "Paid",
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
      const orders = await Order.findByIdAndDelete(req.query.id);
      if (!orders) {
        return res.send({
          message: "order not found!",
        });
      }

      return res.send({
        message: "Order deleted successfully",
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
};
