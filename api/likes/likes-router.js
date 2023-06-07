//post veya comment için like butonuna basıldığında like sayısını arttırmak için likes tablosuna yeni bir kayıt eklememiz gerekiyor.

//likes tablosuna yeni bir kayıt eklemek için likes-model.js dosyasında createLike fonksiyonunu oluşturuyoruz.

const express = require("express");
const router = express.Router();
const likeModel = require("./likes-model");
const { limited } = require("../auth/auth-middleware");

// GET /likes/:postId
router.get("/:postId", limited, async (req, res) => {
  const postId = req.params.postId;
  try {
    const likes = await likeModel.getLikesByPostId(postId);
    res.json(likes);
  } catch (error) {
    res.status(500).json({ message: "Beğenileri getirirken bir hata oluştu." });
  }
});

//GET /likes/comments/:commentId // Comment ID'ye göre beğenileri getir
router.get("/comments/:commentId", limited, async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const likes = await likeModel.getLikesByCommentId(commentId);
    res.json(likes);
  } catch (error) {
    res.status(500).json({ message: "Beğenileri getirirken bir hata oluştu." });
  }
});

// POST /likes
router.post("/", limited, async (req, res) => {
  const like = {
    user_id: req.decodedToken.subject,
    post_id: req.body.post_id || null,
    comment_id: req.body.comment_id || null,
  };
  try {
    const newLike = await likeModel.createLike(like);
    res.status(201).json(newLike);
  } catch (error) {
    res.status(500).json({ message: "Beğeni oluşturulurken bir hata oluştu." });
  }
});

// DELETE /likes/:postId
router.delete("/:postId", limited, async (req, res) => {
  const postId = req.params.postId;
  try {
    const deletedLike = await likeModel.deleteLike(postId);
    if (deletedLike) {
      res.json({ message: "Beğeni silindi." });
    } else {
      res.status(404).json({ message: "Beğeni bulunamadı." });
    }
  } catch (error) {
    res.status(500).json({ message: "Beğeni silinirken bir hata oluştu." });
  }
});

// DELETE /likes/:commentId
router.delete("/comments/:commentId", limited, async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const deletedLike = await likeModel.deleteLikeByCommentId(commentId);
    if (deletedLike) {
      res.json({ message: "Beğeni silindi." });
    } else {
      res.status(404).json({ message: "Beğeni bulunamadı." });
    }
  } catch (error) {
    res.status(500).json({ message: "Beğeni silinirken bir hata oluştu." });
  }
});

module.exports = router;
