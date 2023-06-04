const db = require("../../data/db-config");

// Tüm postları veritabanından al
exports.getAllPosts = async () => {
  const posts = await db("posts").select("*");
  return posts;
};

// ID'ye göre bir postu veritabanından al
exports.getPostById = async (postId) => {
  const post = await db("posts").where({ post_id: postId }).first();
  return post;
};

// Yeni bir post oluştur
exports.createPost = async (post) => {
  const createdPost = await db("posts").insert(post).returning("*");
  return createdPost;
};

// Bir postu güncelle
exports.updatePost = async (postId, updatedPost) => {
  const updated = await db("posts")
    .where({ post_id: postId })
    .update(updatedPost);
  return updated;
};

// Bir postu sil
exports.deletePost = async (postId) => {
  const deleted = await db("posts").where({ post_id: postId }).del();
  return deleted;
};
