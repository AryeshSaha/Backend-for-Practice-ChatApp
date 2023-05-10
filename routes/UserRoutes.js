const express = require("express");
const AuthHandler = require("../middlewares/Auth/AuthHandler");
const RegisterUser = require("../controllers/user controllers/RegisterUser");
const LoginUser = require("../controllers/user controllers/LoginUser");
const SearchUsers = require("../controllers/user controllers/AllUsers");
const ProfilePhoto = require("../controllers/user controllers/ProfilePhoto");
const UserStatus = require("../controllers/user controllers/UserStatus");
const FetchUserInfo = require("../controllers/user controllers/FetchUserInfo");

const UserRoute = express.Router();

UserRoute.route("/register").post(RegisterUser);
UserRoute.route("/").get(AuthHandler, SearchUsers);
UserRoute.route("/login").post(LoginUser);
UserRoute.route("/fetchInfo").post(AuthHandler, FetchUserInfo);
UserRoute.route("/logout").get(AuthHandler, UserStatus);
UserRoute.route("/uploadDp").post(AuthHandler, ProfilePhoto);

module.exports = UserRoute;
