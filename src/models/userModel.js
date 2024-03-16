"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const passwordEncyrpt = require("../helpers/passwordEncrypt");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "Email field is required"],
      unique: true,
      validate: [
        (email) => {
          if (email.includes("@") && email.includes(".")) {
            return true;
          }
          return false;
        },
        "Email must be valid.",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: true,

      set: (password) => passwordEncyrpt(password),
    },

    firstName: String,

    lastName: String,
  },
  { collection: "user", timestamps: true }
);

const UserModel = model("User", UserSchema);

module.exports = { User: UserModel };
