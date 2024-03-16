"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogCategoryScema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "blogCategory", timestamps: true }
);

const blogPostSchema = new Schema(
  {
    blogCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: "blogPost",
    timestamps: true,
  }
);

const BlogCategoryModel = model("BlogCategory", blogCategoryScema);
const BlogPostModel = model("BlogPost", blogPostSchema);

module.exports = { BlogPost: BlogPostModel, BlogCategory: BlogCategoryModel };
