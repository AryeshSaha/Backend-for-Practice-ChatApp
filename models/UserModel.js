const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        "https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png",
    },
    isOnline: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

// Hashing Password
UserModel.pre("save", async function (next) {
  // only run this function if the password is modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Check Password
UserModel.methods.CheckPassword = async function (userPass) {
  return await bcrypt.compare(userPass, this.password);
};

const User = mongoose.model("User", UserModel);

module.exports = User;
