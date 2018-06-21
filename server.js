const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./users/UserSchema.js');
const server = express();
const secret = 'You cannot handle the truth!';

server.use(express.json());
server.use(cors());

function generateToken(user) {

    const options = {
        expiresIn: '1h'
    };

    const payload = { name: user.username };

    return jwt.sign(payload, secret, options);
}

function restricted(req, res, next) {
    const token = req.headers.authorization; 

    if (token) {
        jwt.verify(token, secret, (error, decodeURIComponent) => {
            if (error) {
                res.status(401).json('You cannot view all our users because you are not logged in.'); 
                return; 
            }
            
            next(); 
        })
    }
    else {
        res.status(401).json('You cannot view all our users because you are not logged in.'); 
    }
}; 

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.post('/api/signup', (req, res) => {
    User.create(req.body)
        .then(user => {

            res.status(201).json({ username: user.username });
        })
        .catch(error => res.status(500).json(error.message));
});

server.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => {
            if (user) {
                user
                    .validatePassword(password)
                    .then(passwordsMatch => {
                        if (passwordsMatch) {
                            const token = generateToken(user);

                            res.status(200).json({ token });
                        }
                        else {
                            res.status(401).json('Invalid credentials.');
                        }
                    })
                    .catch(error => {
                        res.status(500).json('An error occurred while validating credentials.');
                    })
            }
            else {
                res.status(401).json('Invalid credentials');
            }
        })
        .catch(error => {
            res.status(500).json('An error occurred while validating credentials.');
        })
});

server.get('/api/users', restricted, (req, res) => {
    User.find({})
        .select('username')
        .then(users => {
            res.status(200).json(users); 
        })
        .catch(error => {
            return res.status(500).json(error.message)
        })
}); 

const port = process.env.PORT || 5002;

mongoose
    .connect('mongodb://localhost/testdb')
    .then(() => {
        console.log('=== Connected to MongoDB ===');
        server.listen(port, (req, res) => {
            console.log(`=== API running on port ${port} ===`);
        })
    })
    .catch(error => console.log('=== Error connecting to MongoDB. Is it running? ===', error));

module.exports = server; 