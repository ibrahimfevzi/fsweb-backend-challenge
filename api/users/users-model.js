const db = require("../../data/db-config");

// Kullanıcıları veritabanından al
exports.getAllUsers = async () => {
  const users = await db("users").select("*");
  return users;
};

// ID'ye göre bir kullanıcıyı veritabanından al
exports.getUserById = async (userId) => {
  const user = await db("users").where({ user_id: userId }).first();
  return user;
};

// Email'e göre bir kullanıcıyı veritabanından al
exports.getUserByEmail = async (email) => {
  const user = await db("users")
    .where({ email })
    .first()
    .select("user_id", "username", "email", "password");
  return user;
};

// Yeni bir kullanıcı oluştur
exports.createUser = async (user) => {
  const createdUser = await db("users").insert(user).returning("*");
  return createdUser;
};

// Kullanıcıyı güncelle
exports.updateUser = async (userId, updatedUser) => {
  const updated = await db("users")
    .where({ user_id: userId })
    .update(updatedUser);
  return updated;
};

// Kullanıcıyı sil
exports.deleteUser = async (userId) => {
  const deleted = await db("users").where({ user_id: userId }).del();
  return deleted;
};

exports.findBy = (field, value) => {
  return db("users").where(field, value).first();
};

