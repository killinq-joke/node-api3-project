const express = require("express");
const helpers = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  helpers
    .get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.post;

  helpers
    .getById(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.post;

  helpers
    .remove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.post;
  const change = req.body;

  helpers
    .update(id, change)
    .then(response => {
      res.status(200).json(change);
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  if (isNaN(req.params.id)) {
    res.status(400).json({ message: "invalid post id" });
  } else {
    req.post = req.params;
    next();
  }
}

module.exports = router;
