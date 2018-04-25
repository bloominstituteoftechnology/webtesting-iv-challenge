const router = require('express').Router();
const Band = require('../model/Model');

router
  .route('/')
  .get((req, res) => {
    Band.find({}, (err, bands) => {
      if (err) {
        res.status(500).json({ error: 'Cannot find your bands' });
      }
      res.json(bands);
    });
  })

  .post((req, res) => {
    const band = new Band(req.body);
    const { name, genre, numberOfMembers, yearFounded } = req.body;
    band
      .save()
      .then(savedBand => {
        res.status(201).json({ savedBand });
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: 'There was an errror creating the band' });
      });
  });

router
  .route('/:id')

  .put((req, res) => {
    const { name, genre, numberOfMembers, yearFounded } = req.body;
    Band.findByIdAndUpdate(req.params.id, req.body)
      .then(band => {
        res.status(201).json(updatedBand);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: 'The band information could not be modified.'
        });
      });
  })

  .delete((req, res) => {
    Band.findByIdAndRemove(req.params.id)
      .then(band => {
        res.status(200).json({ message: 'The band was successfully deleted' });
      })
      .catch(err => {
        if (res.status(404)) {
          res.json({
            errorMessage: 'The band with the specified ID does not exist.'
          });
        } else {
          res
            .status(500)
            .json({ errorMessage: 'The band could not be removed' });
        }
      });
  });

module.exports = router;
