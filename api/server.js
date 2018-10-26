const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// Add home route
server.get('/', (req, res) => {
  res.status(200).json({ message: 'server is working!' });
});

// ==============PETS ENDPOINTS=============

// Without db
server.post('/pets/:petsname', (req, res) => {
  const { petsname } = req.params;
  res.status(201).json({ petsname: `${petsname}`});
});

server.delete('/pets/:petsname', (req, res) => {
  const { petsname } = req.params;

  res.status(200).json({ confirmed: `${petsname} has been deleted` });
});

server.put('/pets/:petsname', (req, res) => {
  const { petsname } = req.params;

  res.status(200).json({ updated: `${petsname} has been updated` });
});

// // With db
// // Add GET ROUTE HANDLER to get the list of pets
// server.get('/pets', (req, res) => {
//   db('pets')
//     .then(pets => {
//       res.status(200).json(pets);
//     })
//     .catch(err => res.status(500).json(err));
// });

// // Add POST ROUTE HANDLER to create a pet's name
// server.post('/pets', (req, res) => {
//   if (!req.body.petsName){
//     return res.status(400).send({ error: "Please provide a name for your pet." });
//   }
//   const pet = req.body;

//   db.insert(pet)
//     .into('pets')
//     .then(ids => {
//       res.status(201).json({ msg: 'name of pet has been added'});
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

// //Add DELETE ROUTE HANDLER to delete a pet
// server.delete('/pets/:id', (req, res) => {
//   const { id } = req.params;

//   db('pets')
//     .where ({ id })
//     .del()
//     .then(count => {
//       if (!count || count < 1) {
//         res.status(404).json({ message: 'No records found to delete.'});
//       } else {
//         res.status(200).json({ msg: 'pet has been deleted' });
//       }
//     })
//     .catch(err => res.status(500).json(err));
//   });

// //Add PUT ROUTE HANDLER to update a cohort's name
// server.put('/pets/:id', async (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   db('pets')
//     .where ({ id })
//     .update(changes)
//     .then(count => {
//       if (!count || count < 1) {
//         res.status(404).json({ message: "No records found to update."});
//       } else {
//         res.status(200).json({ msg: 'petsName has been updated' });
//       }
//     })
//     .catch(err => res.status(500).json(err));
//   });

module.exports = server;