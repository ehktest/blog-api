"use strict";

const router = require("express").Router();

const User = require("../controllers/userController");
const idValidation = require("../middlewares/idValidation");

router.post("/login", User.login);
router.all("/logout", User.logout);

router
  .route("/")

  .get(User.list)

  .post(User.create);

router
  .route("/:userId(\\w+)")
  .all(idValidation)

  .get(User.read)

  .put(User.update)
  .patch(User.update)

  .delete(User.destroy);

module.exports = router;
