require("dotenv").config();
const jwt = require("jsonwebtoken");

const express = require("express");

authenticate = (req, res, next) => {
  const token = req.headers.authenticate;

  if (token) {
    const decoded = jwt.verify(token, process.env.secret_key);
    if (decoded) {
      req.body.auther = decoded.auther;
      req.body.autherId = decoded.autherId;
      next();
    } else {
      res.send("login frist");
    }
  } else {
    res.send("login frist");
  }
};

module.exports = { authenticate };
