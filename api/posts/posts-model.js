const db = require("../../data/db-config");

// Tüm postları veritabanından al
exports.getAllPosts = async () => {
  const posts = await db("posts");
  return posts;
};

// ID'ye göre bir postu veritabanından al
exports.getPostById = async (postId) => {
  const post = await db("posts").where({ post_id: postId }).first();
  return post;
};

// Yeni bir post oluştur
exports.createPost = async (post) => {
  const [newPost] = await db("posts").insert(post, "*");
  return newPost;
};

// Bir postu güncelle
exports.updatePost = async (postId, updatedPost) => {
  await db("posts").where({ post_id: postId }).update(updatedPost);
  const updated = await db("posts").where({ post_id: postId }).first();
  return updated;
};

// Bir postu sil
exports.deletePost = async (postId) => {
  const deleted = await db("posts").where({ post_id: postId }).del();
  return deleted;
};
