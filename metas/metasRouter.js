const express = require('express');

const Meta = require('./Meta.js');

const router = express.Router();

router.get('/', (req, res) => {
  Meta.find({})
    .then(metas => res.status(200).json(metas))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
