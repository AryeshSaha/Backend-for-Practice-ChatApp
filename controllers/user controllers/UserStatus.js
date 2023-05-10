const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/UserModel");

const UserStatus = expressAsyncHandler(async(req, res) => {
    const { id } = req.user;
    const user = await User.findById(id);
    if(!user) throw new Error("User doesn't exist");
    try {
        const offline = await User.findByIdAndUpdate(id,
            {
                isOnline: false,
            },
            {
                new: true,
                timestamps: true,
            })
        res.json(offline)
    } catch (error) {
        res.json(error)
    }
});

module.exports = UserStatus;