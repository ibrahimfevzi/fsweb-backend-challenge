const express = require("express");
const server = express();
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");
const commentsRouter = require("./comments/comments-router");
const postsRouter = require("./posts/posts-router");

server.use(express.json());
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/comments", commentsRouter);
server.use("/api/posts", postsRouter);

module.exports = server;
