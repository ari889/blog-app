/**
 * internal imports
 */
const Post = require("../models/Post");

const allPosts = async (req, res) => {
  try {
    let sorting;
    if (req.query.sort !== "undefined" && req.query.sort === "newest") {
      sorting = "-_id";
    } else if (
      req.query.sort !== "undefined" &&
      req.query.sort === "most_liked"
    ) {
      sorting = "-likes";
    } else {
      sorting = "_id";
    }

    const posts = await Post.find({
      isSaved: req.query.filter === "saved" || false,
    }).sort(sorting);
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

/**
 * get single post
 */
const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

/**
 * get related posts
 */
const getRelatedPosts = async (req, res) => {
  const id = req.body.id;
  const tags = req.body.tags;
  try {
    const posts = await Post.find({
      tags: { $in: [...tags] },
      _id: { $ne: id },
    })
      .sort("-createdAt")
      .limit(5);
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

module.exports = {
  allPosts,
  getSinglePost,
  getRelatedPosts,
};
