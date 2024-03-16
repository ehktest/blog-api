"use strict";
const router = require("express").Router();

router.all("/", (req, res) => {
  if (req.isLogin) {
    res.json({
      error: false,
      message: "WELCOME BLOG API PROJECT",
      session: req.session,
      user: req.user,
    });
  } else {
    res.json({
      error: false,
      message: "WELCOME BLOG API PROJECT",
      session: req.session,
    });
  }
});

module.exports = router;
