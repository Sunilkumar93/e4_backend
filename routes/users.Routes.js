require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users.Model");

const saltRound = +process.env.saltRound || 2;

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const payload = req.body;

  try {
    bcrypt.hash(payload.pass, saltRound, async (err, hash) => {
      if (err) {
        throw err;
      } else {
        payload.pass = hash;
        const user = await UserModel(payload);
        await user.save();
        res.status(200).send("Registered");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });

    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { auther: user[0].name, autherId: user[0]._id },
            process.env.secret_key
          );
          res.send({ msg: "login success", token: token });
        } else {
          res.send("wrong credential");
        }
      });
    } else {
      res.send("wrong Credential");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
});

module.exports = { userRouter };
