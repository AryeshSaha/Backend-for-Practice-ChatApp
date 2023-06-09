const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");
const expressAsyncHandler = require("express-async-handler");

const AuthHandler = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.SECRET);

      req.user = await User.findById(decoded?.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorised Attempt");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No Token Found");
  }
});

module.exports = AuthHandler;
