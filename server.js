/* Dependencies */
const express = require('express');
const mongoose = require('mongoose');
/* Server */
const server = express();
const drinkRoutes = require('./routes/drinkRoutes');
// const Drink = require('./models/Drink.js');

mongoose.connect('mongodb://localhost/testdb')
  .then(() => console.log(`\n=== MongoDB connected! ===\n`))
  .catch(err => console.log(err));

// General Middleware
server.use(express.json());

/* Routes */

server.get('/', (req, res) => {
  res.status(200).json({ api: "is running" });
});

server.use('/drinks',drinkRoutes);

// server.get('/drinks', (req, res) => {
//   Drink.find()
//     .then(drinks => res.status(200).json(drinks))
//     .catch(error => res.status(500).json(error));
// });
// server
//   .route('/drinks')
  // .get((req, res) => {
  //   Drink.find()
  //     .then(drinks => res.status(200).json(drinks))
  //     .catch(error => res.status(500).json(error));
  // })
//   .post((req, res) => {
//     const { name, type, alcoholic, description } = req.body;
//     Drink.create({ name, type, alcoholic, description})
//       .then(drink => res.status(200).json(drink))
//       .catch(error => res.status(500).json(error));
//   });


/* Server Listen START! */
// const port = process.env.PORT || 5500;
// server.listen(port, () => {
//   console.log(`\n*** API running on part ${port} ***\n`);
// });

module.exports = server;