const express = require('express');

const users = require('../users/usersModel.js');

const server = express();

server.use(express.json());

server.get('/users', async (req, res) => {
  try {
    const rows = await users.fetch();
    res.status(200).json(rows);
  } catch {
    res.status(500).json({error: "trouble getting users"})
  }
  
});

server.post('/users', async (req, res) => {
  try {
    const newUser = req.body;
    if (newUser.name && typeof newUser.name === "string" && newUser.name !== "" && newUser.name.length <= 255) {
      const posted = await users.insert(newUser);

      res.status(201).json(posted);
    }
    else {
      res.status(400).json({error: "user requires name that is a string less than 255 characters"})
    }
  } catch {
    res.status(500).json({error: "trouble adding user"})
  }
})

server.delete('/users/:id', async (req, res) => {
  try {
    const {id} = req.params;
      const count = await users.remove(id);

      if(!count || count < 1){
          res.status(404).json({message: "User does not exist"})
      } else{
          res.status(200).json(count);
      }
    }
    catch (err) {
      res.status(500).json({message: "trouble deleting user"});
      }
})

module.exports = server;