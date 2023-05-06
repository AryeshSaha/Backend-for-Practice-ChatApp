const expressAsyncHandler = require("express-async-handler");
const Chat = require("../../models/ChatModel");
const User = require("../../models/UserModel");

const FetchChats = expressAsyncHandler(async (req, res) => {
  try {
    let results = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("grpAdmin", "-password")
      .populate("lastMsg")
      .sort({ updatedAt: -1 })
      // .then(async (results) => {
      //   results = await User.populate(results, {
      //     path: "lastMsg.sender",
      //     select: "name profilePic email",
      //   });
      // });
    results = await User.populate(results, {
      path: "lastMsg.sender",
      select: "name profilePic email",
    });
    res.status(200).send(results);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = FetchChats;
