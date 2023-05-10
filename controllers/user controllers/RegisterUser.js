const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/UserModel");
const genToken = require("../../config/token/genToken");

const RegisterUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, profilePic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) throw new Error("User Already Exists!");

  try {
    const user = await User.create({
      name,
      email,
      password,
      profilePic,
      isOnline: true,
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      isOnline: user.isOnline,
      token: genToken(user.id),
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = RegisterUser;
