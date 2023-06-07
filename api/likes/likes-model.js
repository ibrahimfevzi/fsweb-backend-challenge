//likes tablosuna yeni bir kayıt eklemek için likes-model.js dosyasında createLike fonksiyonunu oluşturuyoruz.

// Path: api/likes/likes-model.js

const db = require("../../data/db-config");

function getLikesByPostId(post_id) {
  return db("likes").where({ post_id });
}

function getLikesByCommentId(comment_id) {
  return db("likes").where({ comment_id });
}

function createLike(like) {
  return db("likes").insert(like).returning("*");
}

function deleteLike(post_id) {
  return db("likes").where({ post_id }).del();
}

function deleteLikeByCommentId(comment_id) {
  return db("likes").where({ comment_id }).del();
}

module.exports = {
  createLike,
  deleteLike,
  getLikesByPostId,
  getLikesByCommentId,
  deleteLikeByCommentId,
};
