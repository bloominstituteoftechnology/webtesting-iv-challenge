const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Band = require('./band');
const server = express();
server.use(bodyParser.json());
server.use(morgan('dev'));

// ROUTES WILL BE BUILT HERE
server.get('/api/bands', (req, res) => {
    Band.find({})
    .then(band => {
        res.status(200).json(band)
    })
    .catch(error => {
        res.status(500).json(error)
    })

    //   if (err) {
    //     res.status(500).json({ error: 'Cannot find your bands' });
    //   }
    //   res.json(bands);
    // });
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
  
  });

server.get('/api/band/:id', (req, res) => {
    // const {id} = req.params.id;

    Band
    .findById(req.params.id)
    .then(idBand => {
        res.status(200).json(idBand);
    })
    .catch(error => {
        res.status(500).json(err);
    })
})

server.put('/api/band/:id', (req, res) => {
    Band.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.status(200).json({update: 'Band updated'})
    })
    .catch(error => {
        res.status(200).json(error);
    })

})

server.delete('/api/band/:id', (req, res) => {
    Band.findByIdAndRemove(req.params.id)
    .then(() => {
        res.status(200).json({status: 'Band deleted'})
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

// server.delete('/bands/:id', (req, res) => {
//     Band.findByIdAndRemove(req.params.id, req.body)
//       .then(response => {
//         res.status(200).json(response);
//       })
//       .catch(err => {
//         res.status(200).json({ error: 'Error Deleting' });
//       });
//   });
module.exports = server;