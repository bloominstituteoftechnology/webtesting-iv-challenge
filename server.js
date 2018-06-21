const express = require('express');
const mongoose = require('mongoose');
const User = require('./UserModel.js');
const server = express();

mongoose.connect('mongodb://localhost/temp').then(() => {
  console.log('\n*** Connected to database ***\n');
})
    .catch(err => {
      console.log('error connecting to database');
    });

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json('sanity check');
});

server.get('/users', (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(error => {
      res.status(500).json({ error: 'There was an error retrieving the information' });
    });
});

server.post('/', (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put('/:id', (req,res) => {
  const { username, password } = req.body;
  const id = req.params.id;
  User.findByIdAndUpdate( id, { username, password } ).then(user => {
     User.findById(id)
	  .then(user => {
	    res.json({ user });
	  })
      .catch(error => {
	res.status(404).json({ error: 'user could not be found' });
      })
      .catch(error => {
	res.status(500).json({ error: 'user could not be updated' });
      });
  });
});

server.delete('/:id', (req,res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then(response => {
      res.status(200).json('deleted');
    })
     .catch(error => {
      res.status(404).json({ error: 'the user could not be found' });
     })
    .catch(error => {
      res.status(500).json({ error: 'the user could not be removed' });
    });
});
   
if(process.env.NODE_ENV !== 'test') {
  server.listen(8000,() => console.log('\n*** API running on port 8000\n'));
};

module.exports = server;
