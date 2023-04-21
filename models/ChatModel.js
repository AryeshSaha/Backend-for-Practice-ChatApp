const mongoose = require("mongoose");

const ChatModel = mongoose.Schema(
  {
    chatName: {
        type: String,
        trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User",
      },
    ],
    lastMsg: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Message",
    },
    grpAdmin: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatModel)

module.exports = Chat
