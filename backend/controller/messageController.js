const axios = require("axios");
const User = require("../models/userModel");
const Message = require("../models/messageModel");




module.exports.storeMessages = async (req, res) => {
  try {
    const { message, phone } = req.body;

    const id = req.params.id;
    if (!message || !phone) {
      return res.status(400).json({ error: "Enter all the required fields" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userMessage = await Message.create({
      user: id,
      message,
      muid: muid,
      receiverNumber: phone,
    });

    res.status(201).json({ userMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getMessages = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const messages = await Message.find({ user: id }).populate(
      "user",
      "contact"
    );
    if (!messages) {
      return res.status(404).json({ error: "Messages not found" });
    }
    const response = { messages };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// module.exports.getMessages = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     if (!userId) {
//       return res.status(400).json({ error: "User ID is required" });
//     }
//     const message = await Message.findOne({ user: userId }).populate(
//       "user",
//       "contact"
//     );

//     if (!message) {
//       return res.status(404).json({ error: "Message not found" });
//     }

//     const muid = message.muid;
//     const files = await File.find({ muid: muid });
//     const fileName = files.map((file) => files.filename);
//     if (!files || files.length === 0) {
//       return res
//         .status(404)
//         .json({ error: "Files not found for the given muid" });
//     }

//     const response = { message, fileName };

//     res.status(200).json(response);
//   } catch (error) {
//     console.error("Error in getDataByMuid:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
