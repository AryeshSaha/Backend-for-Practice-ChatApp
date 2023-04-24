const expressAsyncHandler = require("express-async-handler");
const Message = require("../../models/MessageModel");
const Chat = require("../../models/ChatModel");
const User = require("../../models/UserModel");

const SendMsg = expressAsyncHandler(async (req, res) => {
  const { content, image, chatId } = req.body;

  if (!content && !image || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    images: image,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name profilePic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name profilePic email",
    });

    await Chat.findByIdAndUpdate(
      chatId,
      {
        lastMsg: message,
      },
      {
        new: true,
      }
    );

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = SendMsg;
