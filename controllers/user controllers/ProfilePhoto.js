const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/UserModel");

const ProfilePhoto = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  const { profilePic } =  req.body;

  const validId = await User.findById(id);

  if (!validId) throw error("User doesn't exist");

  try {
    const user = await User.findByIdAndUpdate(id, {
        profilePic,
    },
    {
        new: true,
    })
    res.json(user)
  } catch (error) {
    res.json(error)
  }
});

module.exports = ProfilePhoto;
