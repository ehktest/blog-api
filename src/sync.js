"use strict";

const { User } = require("./models/userModel");
const { BlogCategory, BlogPost } = require("./models/blogModel");

const syncModels = async () => {
  let blogCategory = await BlogCategory.findOne();

  if (blogCategory) {
    BlogPost.updateMany(
      {
        blogCategoryId: { $exists: false },
      },
      {
        blogCategoryId: blogCategory._id,
      }
    ).catch((err) => console.log(err));
  }

  console.log("** Synchronized **");
};

module.exports = syncModels;
