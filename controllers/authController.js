const { sequelize, User } = require("../models");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const { use } = require("express/lib/application");

// signup

exports.register = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      password: await bcrypt.hash(req.body.password, 12),
    });

    res.status(201).json({
      status: "success",
      // token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "fail",
      message: "something went wrong!",
    });
  }
};

// login

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // is user exist and password is correct
    const userExist = await User.findOne({
      where: { email },
    });
    // console.log(userExist);
    if (userExist) {
      const passwordValid = await bcrypt.compare(password, userExist.password);

      // jwt

      const token = jwt.sign({ userExist }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      if (passwordValid) {
        res.status(200).json({
          status: "success",
          token,
        });
      } else {
        res.status(400).json({ error: "Password Incorrect" });
      }
    } else {
      res.status(400).json({ error: "user does not exist" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.changePassword = async (req, res, next) => {
  const user = await User.update(req.body.password);
  try {
    res.status(200).json({
      status: "success",
      message: "password updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
