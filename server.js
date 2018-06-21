const express = require('express');
const mongoose = require("mongoose");
const User = require('./users/User');
const cors = require('cors');
var bodyParser = require('body-parser')

const server = express();
server.use(express.json());
server.use(cors());
server.use(bodyParser.json());
// mongoose
// .connect("mongodb://localhost/db")
//   .then(mongo => {
//     console.log("connected to db");
//   })
//   .catch(err => {
//     console.log("error connecting to the db", err);
//   });

server.get('/', (req, res) => {
    res.status(200).json( {api: 'running'} );
});

server.post('/api/users', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    User
        .create({ username, password })
        .then((user) => {
            res.status(201).json(user);
        })
        .catch(err => res.status(500).json(err));
});

server.delete('/api/users', (req, res) => {
    User
        .remove({})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json(err));
});

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/testdb', {}, err => {
  if (err) console.log(err);
  console.log('Mongoose connected us to our DB');
});

server.listen(port, () => {
    console.log(`\n=== API running on http://localhost:${port} ===\n`);
  });

module.exports = server;