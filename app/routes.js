const express = require('express');
const router = express.Router();

const Show = require('./shows.js');

router.get('/', (req, res) => {
  Show.find({})
    .then(series => {
      res.status(200).json(series);
    })
    .catch(err => {
      res.status(500).json({ error: 'problems getting shows' });
    });
});

router.post('/', (req, res) => {
  const show = new Show(req.body);

  show
    .save()
    .then(newShow => {
      res.status(200).json(newShow);
    })
    .catch(err => {
      res.status(500).json({ error: 'couldnt save new data' });
    });
});
module.exports = router;
