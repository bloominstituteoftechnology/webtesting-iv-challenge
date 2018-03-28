const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const fetch = require('node-fetch');

const loggedIn = false;

const PORT = 5000;
const server = express();
server.use(helmet());
server.use(express.json());

server.get('/JimmyBot', (req, res) => {
  return console.log(`You are going to test the JimmyBot:
  Testing1: is this you? ${{ name: 'Jimmy', age: 45, eyeColor: 'blue' }}
  Testing2: Then what do you want? ${{ gimmeCookie: () => console.log('Here is a Cookie!') }}
  Testing3: Wait what are you doing?... ${{ eatMyCookie: cookie => console.log(`I ate ${cookie}`) }}`);
});

server.post('/signup', (req, res) => {
  res.status(201).send(req.body);
});

server.get('/testing2', (req, res) => {
  return console.log('Who cares');
});

server.get('/testing3', (req, res) => {
  return console.log('Who cares');
});

server.listen(PORT, () => {
  console.log(`Server is connected on port: ${PORT}`);
});
