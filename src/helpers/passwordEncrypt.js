"use strict";

const cyrpto = require("node:crypto");
const keyCode = process.env?.SECRET_KEY || "1235adfa@#$asdWERfs435079#$%";
const loopCount = 10_000;
const charCount = 32;
const encType = "sha512";

module.exports = function (password) {
  return cyrpto
    .pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
    .toString("hex");
};
