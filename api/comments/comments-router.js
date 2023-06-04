const express = require("express");
const router = express.Router();
const commentModel = require("./comments-model");
const authMiddleware = require("../auth/auth-middleware");

// GET /comments
router.get("/", commentModel.getAllComments);

// GET /comments/:id
router.get("/:id", commentModel.getCommentById);

// POST /comments
router.post("/", authMiddleware.authenticate, commentModel.createComment);

// PUT /comments/:id
router.put("/:id", authMiddleware.authenticate, commentModel.updateComment);

// DELETE /comments/:id
router.delete("/:id", authMiddleware.authenticate, commentModel.deleteComment);

module.exports = router;
