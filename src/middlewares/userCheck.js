"use strict";

const { User } = require("../models/userModel");

module.exports = async (req, res, next) => {
  if (req?.session?.id) {
    const { id, password } = req.session;
    const user = await User.findById(id);
    if (user && user.password === password) {
      req.user = user;
      req.isLogin = true;
    } else {
      req.session = null;
      req.isLogin = false;
    }
  }
  next();
};
