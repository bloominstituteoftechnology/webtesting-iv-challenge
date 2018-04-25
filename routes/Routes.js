const router = require('express').Router();
const Band = require('../model/Model');

router
  .route('/')

  // Create Band
  .post((req, res) => {
    const band = new Band(req.body);
    const { name, genre, numberOfMembers, yearFounded } = req.body;
    band
      .save()
      .then(savedBand => {
        res.status(201).json({ savedBand });
      })
      .catch(error => {
        res.status(500).json({ error: 'There was an error creating band' });
      });
  })

  // Read Bands
  .get((req, res) => {
    Band.find({})
      .then(bands => {
        res.status(200).json(bands);
      })
      .catch(error => {
        res.status(500).json({ error: 'There was an error getting bands' });
      });
  });

router
  .route('/:id')

  //   // Read Band By ID
  //   .get((req, res) => {
  //     Band.findById(req.params.id)
  //       .then(band => {
  //         if (band === null) {
  //           res.status(404).json({
  //             message: 'The band with the specified id does not exist.'
  //           });
  //         } else {
  //           res.status(200).json(band);
  //         }
  //       })
  //       .catch(err => {
  //         res
  //           .status(500)
  //           .json({ error: 'The band information could not be retrieved.' });
  //       });
  //   });

  // Update Band
  .put((req, res) => {
    const { id } = req.params;
    const update = req.body;
    const { name, genre, numberOfMembers, yearFounded } = update;

    Band.findByIdAndUpdate(id, update)
      .then(band => {
        res.status(201).json(update);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: 'The band information could not be modified.' });
      });
  })

  .delete((req, res) => {
    Band.findByIdAndRemove(req.params.id)
      .then(band => {
        res.status(200).json({ message: 'The band was successfully deleted.' });
      })
      .catch(err => {
        res.status(500).json({ message: 'The band could not be deleted.' });
      });
  });

module.exports = router;
