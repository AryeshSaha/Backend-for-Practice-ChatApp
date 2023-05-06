const expressAsyncHandler = require("express-async-handler");
const Message = require("../../models/MessageModel");

const GetMsgs = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name profilePic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = GetMsgs;
