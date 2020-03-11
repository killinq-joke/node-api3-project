const express = require('express');
const helpers = require("./userDb");
const postsHelper = require("../posts/postDb");

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  const user = req.body;
  helpers.insert(user)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    res.status(500).json({ message: "error" })
  })
});

// check this back
router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.user;
  const post = req.body;
  post.user_id = id;
  postsHelper.insert(post)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    res.status(500).json({ message: "error" })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  helpers.get()
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    res.status(500).json({ message: "error" })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.user;
  helpers.getById(id)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    res.status(500).json({ message: "error" })
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.user;
  helpers.getUserPosts(id)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    res.status(500).json({ message: "error" })
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.user;
  helpers.remove(id)
  .then(response => {
    res.status(200).json({ message: "deleted" })
  })
  .catch(err => {
    res.status(500).json({ message: "error" })
  })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.user;
  const change = req.body;

  helpers.update(id, change)
  .then(response => {
    res.status(200).json({ message: "updated" })
  })
  .catch(err => {
    res.status(500).json({ message: "error" })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "invalid user id"})
  } else {
    req.user = req.params;
    next()
  }
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
