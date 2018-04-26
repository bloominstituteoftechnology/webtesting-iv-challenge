const express = require('express');

const Meta = require('./Meta.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    Meta.find({})
      .then(metas => res.status(200).json(metas))
      .catch(err => res.status(500).json(err));
  })
  .post((req, res) => {
    if (req.body.name && req.body.location) {
      const newMeta = new Meta(req.body);
      newMeta
        .save()
        .then(saved => {
          res.status(201).json(saved);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else {
      res.status(422).json('provide name and location!');
    }
  });

module.exports = router;
