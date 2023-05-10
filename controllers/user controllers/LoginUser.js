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
    const user = await User.findByIdAndUpdate(userExists._id,{
      isOnline: true,
    },{
      new: true,
      timestamps: true,
    })
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      isOnline: user.isOnline,
      token: genToken(user.id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid password");
  }
});

module.exports = LoginUser;
