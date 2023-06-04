const express = require("express");
const router = express.Router();
const postModel = require("./posts-model");
const authMiddleware = require("../auth/auth-middleware");

// GET /posts
router.get("/", postModel.getAllPosts);

// GET /posts/:id
router.get("/:id", postModel.getPostById);

// POST /posts
router.post("/", authMiddleware.authenticate, postModel.createPost);

// PUT /posts/:id
router.put("/:id", authMiddleware.authenticate, postModel.updatePost);

// DELETE /posts/:id
router.delete("/:id", authMiddleware.authenticate, postModel.deletePost);

module.exports = router;
