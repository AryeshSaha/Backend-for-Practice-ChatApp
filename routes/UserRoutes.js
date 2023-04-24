const express = require("express");
const AuthHandler = require("../middlewares/Auth/AuthHandler");
const RegisterUser = require("../controllers/user controllers/RegisterUser");
const LoginUser = require("../controllers/user controllers/LoginUser");
const SearchUsers = require("../controllers/user controllers/AllUsers");
const ProfilePhoto = require("../controllers/user controllers/ProfilePhoto");

const UserRoute = express.Router();

UserRoute.route("/register").post(RegisterUser);
UserRoute.route("/").get(AuthHandler, SearchUsers);
UserRoute.route("/login").post(LoginUser);
UserRoute.route("/uploadDp").post(AuthHandler, ProfilePhoto);

module.exports = UserRoute;
