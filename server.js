const path = require("path");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const usersRouter = require("./users/userRouter");
const postsRouter = require("./posts/postRouter");
const server = express();

server.use(express.json());
server.use(express.static(path.join(__dirname, "client/build")))
server.use(helmet());
server.use(cors());
server.use("/users", usersRouter);
server.use("/posts", postsRouter);

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.js"))
})

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next();
}

module.exports = server;
