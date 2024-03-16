"use strict";

require("express-async-errors");

const { User } = require("../models/userModel");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(User);

    res.status(200).json({
      error: false,
      details: await res.getModelListDetails(User),
      result: data,
    });
  },

  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.userId });

    res.status(200).json({
      error: false,
      result: data,
    });
  },

  create: async (req, res) => {
    const data = await User.create(req.body);

    res.status(201).json({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.userId }, req.body);

    res.status(202).json({
      error: false,
      message: "Updated",
      body: req.body,
      result: data,
      new: await User.findOne({ _id: req.params.userId }),
    });
  },

  destroy: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });

    if (data.deletedCount !== 0) {
      res.status(200).json({
        error: false,
        result: data,
      });
    } else {
      res.errorStatusCode = 404;
      throw new Error("Document Not Found");
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email });
      if (user && user.password === passwordEncrypt(password)) {
        console.log("🔭 ~ login: ~ req.session ➡ ➡ ", req.session);

        req.session.id = user._id;
        req.session.password = user.password;
        console.log("🔭 ~ login: ~ req.session ➡ ➡ ", req.session);

        if (req.body?.remindMe) {
          req.session.remindMe = req.body.remindMe;

          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3;
        }

        res.status(200).json({
          error: false,
          message: "Login OK",
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Login parameters are not true.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Email and password required.");
    }
  },

  logout: async (req, res) => {
    req.session = null;
    res.status(200).json({
      error: false,
      message: "Logout OK",
    });
  },
};
