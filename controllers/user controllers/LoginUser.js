const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/UserModel");
const genToken = require("../../config/token/genToken");

const LoginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  }

  const userExists = await User.findOne({ email });

  if (!userExists) throw new Error("User Doesn't Exist!");

  if (await userExists.CheckPassword(password)) {
    res.json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      profilePic: userExists.profilePic,
      token: genToken(userExists.id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid password");
  }
});

module.exports = LoginUser;
