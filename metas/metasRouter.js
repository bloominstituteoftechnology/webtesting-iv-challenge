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

  router
  .route('/:metaName')
  .get((req, res) => {
    Meta.find({name: req.params.metaName})
      .then(meta => res.status(200).json(meta[0]))
      .catch(err => res.status(500).json(err));
  })
  .put((req, res) => {
    Meta.updateOne({name: req.params.metaName}, req.body)
      .then(meta => res.status(200).json(meta))
      .catch(err => res.status(500).json(err));
  })
  .delete((req, res) => {
    Meta.deleteOne({name: req.params.metaName})
      .then(meta => res.status(200).json(meta))
      .catch(err => res.status(500).json(err));
  })
  

module.exports = router;
