const express = require("express");
const AuthHandler = require("../middlewares/Auth/AuthHandler");
const AccessChat = require("../controllers/chat controllers/AccessChat");
const FetchChats = require("../controllers/chat controllers/FetchChats");
const CreateGroup = require("../controllers/chat controllers/Group chat/CreateGroup");
const RenameGroup = require("../controllers/chat controllers/Group chat/RenameGroup");
const AddToGroup = require("../controllers/chat controllers/Group chat/AddToGroup");
const RemoveFromGroup = require("../controllers/chat controllers/Group chat/RemoveFromGroup");

const ChatRoute = express.Router();

ChatRoute.route("/").post(AuthHandler, AccessChat).get(AuthHandler, FetchChats);
ChatRoute.route("/create").post(AuthHandler, CreateGroup)
ChatRoute.route("/rename-grp").put(AuthHandler, RenameGroup)
ChatRoute.route("/addto-grp").put(AuthHandler, AddToGroup)
ChatRoute.route("/removefrom-grp").put(AuthHandler, RemoveFromGroup)

module.exports = ChatRoute;