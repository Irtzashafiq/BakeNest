const Contact = require("../models/contact");

module.exports = {
  saveFeedback: async (req, res) => {
    try {
      const { name, email, message } = req.body;

      // Create a new contact message entry
      const newMessage = new Contact({ name, email, message });
      await newMessage.save();

      res.status(200).json({ message: "Message saved successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save message" });
    }
  },

  getFeedback: async (req, res) => {
    try {
      const feedbacks = await Contact.find();
      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch feedbacks" });
    }
  },
  deleteFeedback: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Attempting to delete message with ID:", req.params);
      const deletedMessage = await Contact.findByIdAndDelete(id);

      if (!deletedMessage) {
        return res
          .status(404)
          .json({ message: error.message || "Message not found" });
      }

      res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || "Failed to delete message" });
    }
  },
};
