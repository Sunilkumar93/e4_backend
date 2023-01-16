const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  device: String,
  auther: String,
  autherId: String,
});

const PostModel = mongoose.model("post", postSchema);

module.exports = { PostModel };
