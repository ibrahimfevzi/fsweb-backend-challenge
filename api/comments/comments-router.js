const express = require("express");
const router = express.Router();
const commentModel = require("./comments-model");
const { limited } = require("../auth/auth-middleware");
const { validateComment } = require("./comments-middleware");

// GET /comments
router.get("/", async (req, res) => {
  try {
    const comments = await commentModel.getAllComments();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Yorumları getirirken bir hata oluştu." });
  }
});

// GET /comments/:id
router.get("/:id", async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await commentModel.getCommentById(commentId);
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ message: "Yorum bulunamadı." });
    }
  } catch (error) {
    res.status(500).json({ message: "Yorumu getirirken bir hata oluştu." });
  }
});

// GET /comments/posts/:postId // Post ID'ye göre yorumları getir
router.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await commentModel.getCommentsByPostId(postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Yorumları getirirken bir hata oluştu." });
  }
});

// POST /comments
router.post("/", limited, validateComment, async (req, res) => {
  const { content } = req.body;
  const comment = {
    content,
    user_id: req.decodedToken.subject,
    post_id: req.body.post_id,
  };
  try {
    const newComment = await commentModel.createComment(comment);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Yorum oluşturulurken bir hata oluştu." });
  }
});

// PUT /comments/:id
router.put("/:id", limited, validateComment, async (req, res) => {
  const commentId = req.params.id;
  const { content } = req.body;
  const comment = {
    content,
    user_id: req.decodedToken.subject,
    post_id: req.body.post_id,
  };
  try {
    const updatedComment = await commentModel.updateComment(commentId, comment);
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Yorum güncellenirken bir hata oluştu." });
  }
});

// DELETE /comments/:id
router.delete("/:id", limited, async (req, res) => {
  const commentId = req.params.id;
  try {
    const deletedComment = await commentModel.deleteComment(commentId);
    res.status(200).json({ message: "Yorum silindi.", deletedComment });
  } catch (error) {
    res.status(500).json({ message: "Yorum silinirken bir hata oluştu." });
  }
});

module.exports = router;
