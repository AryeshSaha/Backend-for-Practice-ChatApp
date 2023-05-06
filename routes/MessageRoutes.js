const express = require("express");
const AuthHandler = require("../middlewares/Auth/AuthHandler");
const GetMsgs = require("../controllers/msg controllers/GetMsgs");
const SendMsg = require("../controllers/msg controllers/SendMsg");


const MessageRoute = express.Router();

MessageRoute.route("/").post(AuthHandler, SendMsg);
MessageRoute.route("/:chatId").get(AuthHandler, GetMsgs);

module.exports = MessageRoute;