/**
 * import express
 */
const express = require("express");
const {
  allPosts,
  getSinglePost,
  getRelatedPosts,
} = require("../controllers/postController");

/**
 * get express router
 */
const router = express.Router();

/**
 * get all posts
 */
router.get("/all", allPosts);

/**
 * get single post
 */
router.get("/single/:id", getSinglePost);

/**
 * get related post
 */
router.post("/related-posts", getRelatedPosts);

module.exports = router;
