const express = require('express');

const users = require('../users/usersModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  // res.status(200).send('api up');
  res.status(200).json({message: "No idea what is going on"});
});

server.get('/users', async (req, res) => {
  const usersList = await users.find();

  res.status(200).json(usersList);
});

server.post('/users', async (req, res) => {
  const user = req.body;
  try{
      if (user) {
        const newUser = await users.add(user);
        res.status(201).json(newUser);
      } else {
        res.status(400).json({message: "Please try againg"});
      }
  } catch (err){
      res.status(500).json({message: "There was an error trying to add a user"})
  }
});

module.exports = server;