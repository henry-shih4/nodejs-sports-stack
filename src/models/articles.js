const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hero_img: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date_written: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date_upload: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Article", articleSchema);
