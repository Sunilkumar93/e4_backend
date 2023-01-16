require("dotenv").config();
const express = require("express");
const { PostModel } = require("../models/Post.Model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  try {
    const post = await PostModel.find({ autherId: req.body.autherId });
    res.send(post);
  } catch (error) {
    console.log(error), res.status(400).send("something went wrong");
  }
});
postRouter.post("/create", async (req, res) => {
  // console.log(req.body)
  const payload = req.body;
  try {
    const post = new PostModel(payload);
    await post.save();
    res.send("post created success");
  } catch (error) {
    console.log(error), res.status(400).send("something went wrong");
  }
});
postRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const autherId_inside_payload = payload.autherId;

  try {
    const post = await PostModel.findOne({ _id: id });

    if (post.autherId !== autherId_inside_payload) {
      res.send("you are not autherized");
    } else {
      await PostModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("succesfull updated");
    }
  } catch (error) {
    console.log(error), res.status(400).send("something went wrong");
  }
});
postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const autherId_inside_payload = req.body.autherId;
  try {
    const post = await PostModel.findOne({ _id: id });

    if (post.autherId !== autherId_inside_payload) {
      res.send("you are not autherized");
    } else {
      await PostModel.findByIdAndDelete({ _id: id });
      res.send("succesfull deleted");
    }
  } catch (error) {
    console.log(error), res.status(400).send("something went wrong");
  }
});

module.exports = { postRouter };
