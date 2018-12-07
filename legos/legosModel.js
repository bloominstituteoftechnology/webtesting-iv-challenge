require('dotenv').config();
const db = require('../data/dbConfig.js');
const express = require('express');
const server = express();
server.use(express.json());
const axios = require('axios');



module.exports = server => {
  server.get('/api/themes', getThemes);
}
module.exports = {
  // insert,
  // update,
  // remove,
  // getAll,
  // findById,
  // getByTheme,
}

// function insert(legoTheme) {
//   const [ id ] = db('lego-themes').insert(legoTheme);

//   return db('lego-themes')
//     .where({ id })
//     .first()
              // .then(ids => {
              //   res.status(201).json({ id: ids[0]});
              // })
              // .catch(err => {
              //   res.status(500).json({ message: 'Error inserting Lego theme', err })
              // })
// };

// function getThemes(req, res) {
//   console.log(req)

//   const url = process.env.url;
//   axios
//    .get(`${url}`)
//     // .where({ name: 'Juniors' })
//     .then(response => {
//       res.status(200).json(response);
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Finding Lego by theme', err })
//     })
// };

