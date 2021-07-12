const express = require("express");
const urlencode = express.urlencoded({ extended: true });

const userModel = require("../models/user");
const { registervalidation, loginvalidation } = require("../validation");
const bcrypt = require("bcryptjs");
require("dotenv/config");
const jwt = require("jsonwebtoken");

const reg = express.Router();

// reg.get("/", (req, res) => {
//   res.send("hello world");
// });
reg.get("/createuser", (req, res) => {
  res.render("register");
});
reg.post("/createuser", urlencode, async (req, res) => {
  //validation
  const { error } = registervalidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedpassword,
  });
  try {
    const createuser = await user.save();
    res.send(createuser);
  } catch (err) {
    console.log("someting went wrong", err);
  }
});

// login route/////////////////////////////////////////////////////////////////////////////////
reg.get("/login", (req, res) => {
  res.render("login");
});

reg.post("/login", urlencode, async (req, res) => {
  //validation
  const { error } = loginvalidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const oneuser = await userModel.findOne({ email: req.body.email });
  if (!oneuser) {
    return res.status(400).send("email not found");
  }
  //password check
  const checkpassword = await bcrypt.compare(
    req.body.password,
    oneuser.password
  );
  if (!checkpassword) return res.status(400).send("password not wrong");

  //creating token
  const token = jwt.sign({ _id: oneuser._id }, process.env.SECRET_KEY, {
    expiresIn: "10s",
  });
  res.header("auth-token", token);
  console.log(token);
  res.cookie("token", token);
  res.redirect("/jwt/privatepost/post");
});

module.exports = reg;
