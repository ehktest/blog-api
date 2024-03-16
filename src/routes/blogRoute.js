"use strict";
const router = require("express").Router();

const { BlogCategory, BlogPost } = require("../controllers/blogController");
const idValidation = require("../middlewares/idValidation");

router
  .route("/categories")

  .get(BlogCategory.list)

  .post(BlogCategory.create);

router
  .route("/categories/:categoryId(\\w+)")
  .all(idValidation)

  .get(BlogCategory.read)

  .put(BlogCategory.update)
  .patch(BlogCategory.update)

  .delete(BlogCategory.destroy);

router
  .route("/posts")

  .get(BlogPost.list)

  .post(BlogPost.create);

router
  .route("/posts/:postId(\\w+)")
  .all(idValidation)

  .get(BlogPost.read)

  .put(BlogPost.update)
  .patch(BlogPost.update)

  .delete(BlogPost.destroy);

module.exports = router;
