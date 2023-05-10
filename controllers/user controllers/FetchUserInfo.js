const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/UserModel");
const FetchUserInfo = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { userId } = req.body;

  const iExist = await User.findById(_id);
  if (!iExist) throw new Error("User Doesn't Exist");

  try {
    const userInfo = await User.findById(userId);
    if (!userInfo) throw new Error("User Doesn't Exist");
    res.json(userInfo);
  } catch (error) {
    res.json(error);
  }
});
module.exports = FetchUserInfo;
