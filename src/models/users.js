const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter aname"],
  },
  authID: {
    type: String,
    required: [true, "Please enter an authID"],
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  picture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Please enter a username"],
  },
});



const User = mongoose.model("User", userSchema);
module.exports = User;
