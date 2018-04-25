// const express = require('express');
// const mongoose = require('mongoose');
// const Band = require('./Band.js');

// const router = express.Router();

// router
//   .route('/')
//   .get((req, res) => {
//     Band.find({})
//       .then(response => {
//         res.status(200).json(response);
//       })
//       .catch(err => {
//         res.status(500).json({ error: 'Error getting' });
//       });
//   })
//   .post((req, res) => {
//     const newBand = new Band(req.body);
//     newBand
//       .save()
//       .then(response => {
//         res.status(200).json(response);
//       })
//       .catch(err => {
//         res.status(500).json({ error: 'Could not POST new band.' });
//       });
//   });

// router
//   .route('/:id')
//   .put((req, res) => {
//     Band.findByIdAndUpdate(req.params.id, req.body)
//       .then(response => {
//         res.status(200).json(response);
//       })
//       .catch(err => {
//         res.status(500).json({ error: 'Error PUTting.' });
//       });
//   })
//   .delete((req, res) => {
//     Band.findByIdAndRemove(req.params.id, req.body)
//       .then(response => {
//         res.status(200).json(response);
//       })
//       .catch(err => {
//         res.status(200).json({ error: 'Error Deleting' });
//       });
//   });
