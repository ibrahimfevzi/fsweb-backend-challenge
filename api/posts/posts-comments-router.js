const express = require("express");
const router = express.Router();
const postModel = require("./posts-model");
const commentModel = require("../comments/comments-model");
const { limited } = require("../auth/auth-middleware");

// JSON yapısını postlar ve ilgili postlara ait yorumlar şeklinde şekillendirdim

/*

[
  {
    "post_id": 1,
    "content": "Hello, Twitter!",
    "comments":
    [
      {
        "comment_id": 1,
                "user_id": 2,
                "post_id": 1,
                "content": "Nice to meet you, İbrahim!",
                "created_at": 1685914658224,
                "likes_count": 0
      },
      {
                "comment_id": 2,
                "user_id": 3,
                "post_id": 1,
                "content": "Welcome to Twitter!",
                "created_at": 1685914658224,
                "likes_count": 0
        },
    ]

    },
]    
*/

// GET /posts-comments
router.get("/", limited, async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    const comments = await commentModel.getAllComments();

    // Postları gruplayarak bir nesne oluşturdum
    const groupedPosts = {};

    // Tüm postlar için döngü oluşturdum
    for (const post of posts) {
      const { post_id, user_id, content, created_at, likes_count } = post;
      groupedPosts[post_id] = {
        post_id,
        user_id,
        content,
        created_at,
        likes_count,
        comments: [],
      };

      // İlgili yorumları bulup  posta ekledim
      const postComments = comments.filter(
        (comment) => comment.post_id === post_id
      );
      groupedPosts[post_id].comments = postComments;
    }

    // JSON yanıtını şekillendir ve döndür
    const response = Object.values(groupedPosts);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Postları getirirken bir hata oluştu." });
  }
});

// GET /posts-comments/:post_id

router.get("/:postId", limited, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await postModel.getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post bulunamadı." });
    }

    const comments = await commentModel.getCommentsByPostId(postId);

    const response = {
      post_id: post.post_id,
      user_id: post.user_id,
      content: post.content,
      created_at: post.created_at,
      likes_count: post.likes_count,
      comments: comments,
    };

    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Post ve yorumları getirirken bir hata oluştu." });
  }
});

module.exports = router;
