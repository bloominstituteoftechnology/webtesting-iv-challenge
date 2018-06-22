const router = require('express').Router();
const Films = require('./filmSchema.js');

router
  .route('/films')
  .post((req, res) => {
    const newFilms = req.body
    console.log(res)
    Films.create(newFilms)
      .then(response => res.status(201).json({ data: response }))
      .catch(err => res.status(500).json({ data: err }))
  })

module.exports = router;
