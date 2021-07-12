const express = require("express");
const { models } = require("mongoose");
const post = express.Router();
const token = require("../tokenverify");

post.get("/post", token, (req, res) => {
  res.render("post");
});

module.exports = post;
