const joi = require("joi");
const user = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUserSchema = joi.object().keys({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(20).required(),
  confirmPassword: joi.ref("password"),
  role: joi.string(),
});
const updateUserSchema = joi.object().keys({
  username: joi.string().required(),
  email: joi.string().email().required(),
});
module.exports = {
  createUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const validate = await createUserSchema.validateAsync(req.body);

      const existingUser = await user.findOne({ email });

      if (existingUser) {
        return res.status(409).send({
          message: "User already exist!",
          response: existingUser,
        });
      }

      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).send({
          message: "password not matched",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const users = new user({
        username: validate.username,
        email: validate.email,
        password: hashedPassword,
        role: req?.body?.role,
        image: req.file ? req.file.path : null,
      });
      const userCreated = await users.save();

      return res.status(201).send({
        message: "User created successfully",
        response: userCreated,
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await user.find();

      return res.send({
        response: users,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      console.log("Request Params:", req.query);
      const users = await user.findById(req.query.id);

      return res.send({
        response: users,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const users = await user.findById(req.query.id);
      const validate = await updateUserSchema.validateAsync(req.body);
      var userUpdated;
      if (users) {
        userUpdated = await user.updateOne(validate);
      }
      if (userUpdated.error) {
        return res.send({
          message: userUpdated.error,
        });
      }
      return res.send({
        message: "User updated successfully",
        response: userUpdated,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const users = await user.findByIdAndDelete(req.query.id);
      if (!users) {
        return res.send({
          message: "user not found!",
        });
      }

      return res.send({
        message: "User deleted successfully",
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  updatePlan: async (req, res) => {
    try {
      const { plan } = req.body;

      const userRecord = await user.findById(req.query.id);

      if (userRecord) {
        await user.updateOne({ _id: req.query.id }, { $set: { plan: plan } });
      }

      return res.send({
        message: "Subscribed",
        response: userRecord,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
};
