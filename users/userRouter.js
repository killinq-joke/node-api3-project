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
router.post('/:id/posts', (req, res) => {
  // do your magic!
  const {id} = req.params;
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

router.get('/:id', (req, res) => {
  // do your magic!
  const {id} = req.params;
  helpers.getById(id)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    res.status(500).json({ message: "error" })
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const {id} = req.params;
  helpers.getUserPosts(id)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    res.status(500).json({ message: "error" })
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const {id} = req.params;
  helpers.remove(id)
  .then(response => {
    res.status(200).json({ message: "deleted" })
  })
  .catch(err => {
    res.status(500).json({ message: "error" })
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  const {id} = req.params;
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
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
