const express = require('express');

const server = express();

server.use(express.json());

let teas = [];

server.get('/', (req, res) => {
  res
    .status(418)
    .json(teas);
});

server.post('/', (req, res) => {
  const teaType = req.body;
  teas = [ ...teas, teaType ];
  res
    .status(418)
    .json({ tea: `${teaType.type} tea is ready`});
});

server.delete('/:tea', (req, res) => {
const teaToDrink = req.params.tea;
teas = teas.filter(tea => tea.teaType != teaToDrink);
res
  .status(418)
  .json({ tea: `the ${teaToDrink} tea was delicious` });
});

module.exports = server;