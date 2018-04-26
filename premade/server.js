const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Band = require('./band');
const server = express();
server.use(bodyParser.json());
server.use(morgan('dev'));

// ROUTES WILL BE BUILT HERE
server.get('/api/bands', (req, res) => {
  Band.find({}, (err, bands) => {
    if (err) {
      res.status(500).json({ error: 'Cannot find your bands' });
    }
    res.json(bands);
  });
});

server.post('/api/bands', (req, res) => {
  newBand = new Band(req.body);

  newBand
  .save()
  .then(newB => {
    res.status(200).json(newB);
  })
  .catch(error => {
    res.status(500).json({error: 'Band not created...'})
  })

})

module.exports = server;
