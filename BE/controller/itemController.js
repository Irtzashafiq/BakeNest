const joi = require("joi");
const item = require("../models/itemModel");

const createItemSchema = joi.object().keys({
  itemName: joi.string().required(),
  itemPrice: joi.string().required(),
  itemDescription: joi.string().max(200),
});
const updateItemSchema = joi.object().keys({
  itemName: joi.string().required(),
  itemPrice: joi.string().required(),
  itemDescription: joi.string().max(200),
});
module.exports = {
  createItem: async (req, res) => {
    try {
      const { itemName } = req.body;

      const validate = await createItemSchema.validateAsync(req.body);

      const existingItem = await item.findOne({ itemName });

      if (existingItem) {
        return res.send({
          message: "Item Already Listed",
          response: existingItem,
        });
      }
      const items = new item({
        itemName: validate.itemName,
        itemPrice: validate.itemPrice,
        itemDescription: validate.itemDescription,
        // image: req.file ? req.file.path : null,
      });
      const itemCreated = await items.save();

      return res.send({
        message: "Item created successfully",
        response: itemCreated,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  getItems: async (req, res) => {
    try {
      const items = await item.find();

      return res.send({
        response: items,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },

  getItemById: async (req, res) => {
    try {
      console.log("Request Params:", req.query);
      const items = await item.findById(req.query.id);

      return res.send({
        response: items,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  updateItem: async (req, res) => {
    try {
      const items = await item.findById(req.query.id);
      const validate = await updateItemSchema.validateAsync(req.body);
      var itemUpdated;
      if (items) {
        itemUpdated = await item.updateOne(validate);
      }
      if (itemUpdated.error) {
        return res.send({
          message: itemUpdated.error,
        });
      }
      return res.send({
        message: "Item updated successfully",
        response: itemUpdated,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  deleteItem: async (req, res) => {
    try {
      const items = await item.findByIdAndDelete(req.query.id);
      if (!items) {
        return res.send({
          message: "item not found!",
        });
      }

      return res.send({
        message: "item deleted successfully",
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
};
