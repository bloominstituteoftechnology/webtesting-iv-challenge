
const express = require('express');
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken');
const secret = "If33lAStho1StrvgGl3w17H7YP05"

const server = express();

const User = require('./models/userModel')
const Cat = require('./models/catModel')

server.use(express.json())

function generateToken(username) {
  const options = {
    expiresIn: '1h'
  };
  const payload = { name: username };
  return jwt.sign(payload, secret, options)
}

function restricted (req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      req.jwtPayload = decodedToken
      console.log('decodedtoken', decodedToken)
      if (err) {
        return res.status(401).json({ message: 'You shall not pass!  Your decoder ring has failed thee!'})
      }
      next();
    })
  } else {
    res.status(401).json({ message: "You shall not pass!  Thou hast no token!"})
  }
}

const sendUserError = (status, message, res) => {
  res.status(status).json({ "error": message })
  return;
}

server.get('/', (req, res) => {
  res.status(200).json({ "greeting": "Speak friend and enter" });
});

server.post('/register', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
      res.status(400).json({ "errorMessage": "Please provide username and password" })
  } else {
      User.create({ username, password })
          .then(({ username }) => {
            const token = generateToken(username)
              res.status(201).json({ username, token })
          }).catch(err => {
            sendUserError(500, err.message, res)
          })
        }
})

server.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
      res.status(400).json({ "errorMessage": "Please provide username and password" })
  } else {
      User.findOne({ username })
        .then(user => {
          if (user) {
            user.validatePassword(password)
            .then(passwordMatch => {
              if (passwordMatch) {
              const token = generateToken(username);
              res.status(200).json({ message: `Welcome, ${username}!`, token })
            } else {
              res.status(401).send('invalid credentials')
            }
            }).catch(err => {
              res.send('database error')
            })
        }  else {
          res.status(401).send('invalid credentials')
      }
    }).catch(err => { 
      res.send(err)
    })
  }
})

server.post('/cats', (req, res) => {
  const { name, gender } = req.body
  if (!name || !gender) {
      res.status(400).json({ "errorMessage": "Please provide kitteh information" })
  } else {
      Cat.create({name, gender, humanSlave})
          .then(savedCat => {
              res.status(201).json({ savedCat })
          }).catch(err => {
            res.status(500).json("Error")
          })
        }
})
      
module.exports = server;