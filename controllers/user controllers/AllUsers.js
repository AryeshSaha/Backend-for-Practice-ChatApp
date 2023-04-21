const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/UserModel");

const SearchUsers = expressAsyncHandler(async (req, res) => {
  const search = req.query.search
    ? {
        $or: [
          {
            name: {
              $regex: req.query.search,
              $options: "i",
            },
          },
          {
            email: {
              $regex: req.query.search,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const users = await User.find(search).find({
    _id: {
      $ne: req.user._id,
    },
  });

  res.json(users);
});

module.exports = SearchUsers;
