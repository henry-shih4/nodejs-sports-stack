const User = require("../models/users");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");

//create new user --> /api/v1/register

exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { username, authID, email, picture } = req.body;
  const user = await User.create({
    username,
    authID,
    email,
    picture,
  });

  res
    .status(200)
    .json({ success: true, message: "New user created. Log in to proceed." });
});


//get user by id

exports.getUserByID = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user || user.length === 0) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({ success: true, data: user });
});