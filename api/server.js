const express = require("express");
const server = express();
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");
const commentsRouter = require("./comments/comments-router");
const likesRouter = require("./likes/likes-router");
const postsRouter = require("./posts/posts-router");
const postsCommentsRouter = require("./posts/posts-comments-router");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

//global middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("dev"));

//routes
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/comments", commentsRouter);
server.use("/api/posts", postsRouter);
server.use("/api/posts-comments", postsCommentsRouter);
server.use("/api/likes", likesRouter);

//error handling middleware
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

//export
module.exports = server;
