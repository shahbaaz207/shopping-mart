const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/key')
const router = express.Router();
const requireLogin=require('../middleware/requireLogin')


router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "please add all the field" });
  }
  User.findOne({ email: email })
    .then((saveUser) => {
      if (saveUser) {
        return res.status(422).json({ error: "user already exists" });
      }
      bcrypt.hash(password, 15).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "please logged correct email & password" });
  }
  User.findOne({ email: email }).then((saveduser) => {
    if (!saveduser) {
      return res.status(422).json({ error: "Invalid Email and Password" });
    }
    bcrypt.compare(password, saveduser.password).then((domatch) => {
      if (domatch) {
        // res.json({ message: "successfully logged In" });
        const token=jwt.sign({_id:saveduser._id},JWT_SECRET)
        res.json({token})
      } else {
        return res.status(422).json({ error: "Invalid Email and Password" });
      }
    }).catch(err=>{
        console.log(err)
    })
  });
});

module.exports = router;
