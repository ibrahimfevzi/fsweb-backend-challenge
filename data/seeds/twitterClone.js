/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("likes").del();
  await knex("comments").del();
  await knex("posts").del();
  await knex("users").del();

  // Inserts seed entries for users table
  await knex("users").insert([
    {
      user_id: 1,
      username: "ibrahim",
      password: "1234",
      email: "ibrahim@example.com",
      avatar:
        "https://raw.githubusercontent.com/ibrahimfevzi/fsweb-backend-challenge/main/assets/avatar1.jpg",
    },
    {
      user_id: 2,
      username: "kerem",
      password: "1234",
      email: "kerem@example.com",
      avatar: "https://avatars.githubusercontent.com/%3Cibrahim%3E",
    },
    {
      user_id: 3,
      username: "mark",
      password: "password3",
      email: "mark@example.com",
      avatar: "https://avatars.githubusercontent.com/%3Cibrahim%3E",
    },
  ]);

  // Inserts seed entries for posts table
  await knex("posts").insert([
    {
      post_id: 1,
      user_id: 1,
      content: "Hello, Twitter!",
      created_at: new Date(),
    },
    {
      post_id: 2,
      user_id: 2,
      content: "Tweeting my thoughts...",
      created_at: new Date(),
    },
    {
      post_id: 3,
      user_id: 3,
      content: "Just joined Twitter!",
      created_at: new Date(),
    },
  ]);

  // Inserts seed entries for comments table
  await knex("comments").insert([
    {
      comment_id: 1,
      user_id: 2,
      post_id: 1,
      content: "Nice to meet you, İbrahim!",
      created_at: new Date(),
    },
    {
      comment_id: 2,
      user_id: 3,
      post_id: 1,
      content: "Welcome to Twitter!",
      created_at: new Date(),
    },
    {
      comment_id: 3,
      user_id: 1,
      post_id: 2,
      content: "I like your tweets!",
      created_at: new Date(),
    },
  ]);

  // Inserts seed entries for likes table
  await knex("likes").insert([
    { like_id: 1, user_id: 3, post_id: 1, created_at: new Date() },
    { like_id: 2, user_id: 1, post_id: 2, created_at: new Date() },
    { like_id: 3, user_id: 2, comment_id: 3, created_at: new Date() },
  ]);
};
