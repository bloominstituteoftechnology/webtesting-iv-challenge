const express = require('express');
const server = express();
const Fries = require('./FriesModel');

server.use(express.json());

server.post('/api/fries', async (req, res) => {

  if (Object.keys(req.body).length === 0) {
    return res.status(500).json("Need to include fries data");
  }

  try {
    const response = await Fries.create(req.body)
    res.status(200).json(response);
  } 
  catch(err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

server.delete('/api/fries/:id', (req, res) => {
    Fries.findByIdAndRemove(req.params.id)
      .then(fries => {
        if (!fries) {
          res.status(404).json({ message: "The fries with the specified ID does not exist."});
        } else {
          res.status(200).json({ message: `Friend with id ${fries._id} deleted.`});
        }
      })
      .catch( err => {
        res.status(500).json({ errorMessage: "The fries information could not be removed."});
      });
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(9000);
}

module.exports = server;
