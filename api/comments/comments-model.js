const db = require("../../data/db-config");

// Tüm yorumları veritabanından al
exports.getAllComments = async () => {
  const comments = await db("comments").select("*");
  return comments;
};

// ID'ye göre bir yorumu veritabanından al
exports.getCommentById = async (commentId) => {
  const comment = await db("comments").where({ comment_id: commentId }).first();
  return comment;
};

// Yeni bir yorum oluştur
exports.createComment = async (comment) => {
  const createdComment = await db("comments").insert(comment).returning("*");
  return createdComment;
};

// Bir yorumu güncelle
exports.updateComment = async (commentId, updatedComment) => {
  const updated = await db("comments")
    .where({ comment_id: commentId })
    .update(updatedComment);
  return updated;
};

// Bir yorumu sil
exports.deleteComment = async (commentId) => {
  const deleted = await db("comments").where({ comment_id: commentId }).del();
  return deleted;
};
