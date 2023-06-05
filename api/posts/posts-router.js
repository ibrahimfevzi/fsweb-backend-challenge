const express = require("express");
const router = express.Router();
const postModel = require("./posts-model");
const { limited } = require("../auth/auth-middleware");

// GET /posts

router.get("/", async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Postları getirirken bir hata oluştu." });
  }
});

// GET /posts/:id
router.get("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postModel.getPostById(postId);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post bulunamadı." });
    }
  } catch (error) {
    res.status(500).json({ message: "Postu getirirken bir hata oluştu." });
  }
});

// POST /posts
// POST /posts
router.post("/", limited, async (req, res) => {
  const { content } = req.body;
  const post = { content, user_id: req.decodedToken.subject }; // req.user_id'yi kullanarak user_id'yi ayarlayın
  try {
    const newPost = await postModel.createPost(post);
    res.status(201).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Post oluşturulurken bir hata oluştu.", error });
  }
});

// PUT /posts/:id
router.put("/:id", limited, async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;
  const { user_id } = req.decodedToken.subject;
  const post = { content, user_id };
  try {
    const updatedPost = await postModel.updatePost(postId, post);
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Post güncellenirken bir hata oluştu." });
  }
});

// DELETE /posts/:id
router.delete("/:id", limited, async (req, res) => {
  const postId = req.params.id;
  try {
    const deletedPost = await postModel.deletePost(postId);
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ message: "Post silinirken bir hata oluştu." });
  }
});

module.exports = router;
