const fs = require("fs");
const { sequelize, User } = require("../models");

exports.getAllUser = async (req, res) => {
  const user = await User.findAll();

  res.status(200).json({
    status: "success",
    result: user.length,
    data: {
      user,
    },
  });
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({ where: { uuid: uuid } });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
