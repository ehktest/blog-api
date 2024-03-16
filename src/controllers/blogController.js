"use strict";

require("express-async-errors");

const { BlogCategory, BlogPost } = require("../models/blogModel");

module.exports.BlogCategory = {
  list: async (req, res) => {
    const data = await res.getModelList(BlogCategory);

    res.status(200).json({
      error: false,
      details: await res.getModelListDetails(BlogCategory),
      result: data,
    });
  },

  read: async (req, res) => {
    const data = await BlogCategory.findOne({ _id: req.params.categoryId });

    res.status(200).json({
      error: false,
      result: data,
    });
  },

  create: async (req, res) => {
    const data = await BlogCategory.create(req.body);
    res.status(201).json({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    const data = await BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );

    res.status(202).json({
      error: false,
      message: "Updated",
      body: req.body,
      result: data,
      new: await BlogCategory.findOne({ _id: req.params.categoryId }),
    });
  },

  destroy: async (req, res) => {
    const data = await BlogCategory.deleteOne({ _id: req.params.categoryId });

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
};

module.exports.BlogPost = {
  list: async (req, res) => {
    const data = await res.getModelList(BlogPost, "blogCategoryId");

    res.status(200).json({
      error: false,
      details: await res.getModelListDetails(BlogPost),
      result: data,
    });
  },

  read: async (req, res) => {
    const data = await BlogPost.findOne({ _id: req.params.postId }).populate(
      "blogCategoryId"
    );

    res.status(200).json({
      error: false,
      result: data,
    });
  },

  create: async (req, res) => {
    const data = await BlogPost.create(req.body);

    res.status(201).json({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    const data = await BlogPost.updateOne({ _id: req.params.postId }, req.body);

    res.status(202).json({
      error: false,
      message: "Updated",
      body: req.body,
      result: data,
      new: await BlogPost.findOne({ _id: req.params.postId }),
    });
  },

  destroy: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });

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
};
