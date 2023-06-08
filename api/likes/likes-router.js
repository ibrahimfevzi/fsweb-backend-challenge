const express = require("express");
const router = express.Router();
const likeModel = require("./likes-model");
const { limited } = require("../auth/auth-middleware");
const errorHandler = require("./likes-middleware");

// GET /likes/:postId
router.get("/:postId", limited, async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const likes = await likeModel.getLikesByPostId(postId);
    res.json(likes);
  } catch (error) {
    next(error);
  }
});

// GET /likes/comments/:commentId
router.get("/comments/:commentId", limited, async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    const likes = await likeModel.getLikesByCommentId(commentId);
    res.json(likes);
  } catch (error) {
    next(error);
  }
});

// POST /likes
router.post("/", limited, async (req, res, next) => {
  const like = {
    user_id: req.decodedToken.subject,
    post_id: req.body.post_id || null,
    comment_id: req.body.comment_id || null,
  };
  try {
    const newLike = await likeModel.createLike(like);
    res.status(201).json(newLike);
  } catch (error) {
    next(error);
  }
});

// DELETE /likes/:postId
router.delete("/:postId", limited, async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const deletedLike = await likeModel.deleteLike(postId);
    if (deletedLike) {
      res.json({ message: "Beğeni silindi." });
    } else {
      res.status(404).json({ message: "Beğeni bulunamadı." });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /likes/comments/:commentId
router.delete("/comments/:commentId", limited, async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    const deletedLike = await likeModel.deleteLikeByCommentId(commentId);
    if (deletedLike) {
      res.json({ message: "Beğeni silindi." });
    } else {
      res.status(404).json({ message: "Beğeni bulunamadı." });
    }
  } catch (error) {
    next(error);
  }
});

// Middleware'i ekle
router.use(errorHandler);

module.exports = router;
