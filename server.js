const express = require("express");
const helmet = require("helmet");
const server = express();

server.use(express.json());
server.use(helmet());

server.get("/friend", (req, res) => {
  res.send(`<h2>Hello, friend!</h2>`);
});

server.get("/:id", (req, res) => {
  res.send(`<h2>That is a nice ${req.params.id}</h2>`);
});

const users = [];

server.post("/users", validateName, validateAge, (req, res) => {
  users.push({ name: req.cleanName, age: req.cleanAge });
  res.status(201).json(users);
});

//custom middleware
function validateName(req, res, next) {
  if (!req.body.name) {
    res.status(422).json({ message: 'name is required'})
  } else if (typeof req.body.name !== "string") {
    res.status(422).json({ message: 'please provide a string'})
  } else if (req.body.name.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    res.status(422).json({ message: 'no special characters'})
  } else {
    req.cleanName = req.body.name;
    next()
  }
}

function validateAge(req, res, next) {
  if (!req.body.age) {
    res.status(422).json({ message: 'age is required'})
  } else if (isNaN(req.body.age)) {
    res.status(422).json({ message: 'does not look like a number'})
  } else if (req.body.age < 18) {
    res.status(422).json({ message: 'be major not minor'})
  } else {
    req.cleanAge = req.body.age;
    next()
  }
}

function logger(req, res, next) {}

module.exports = server;
