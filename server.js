const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Dog = require('./Dog');
const server = express();
server.use(express.json());
server.use(morgan('dev'));

server.get('/api/dogs', (req, res) => {
    Dog.find({}, (err, dogs) => {
        if(err){
            res.status(500).json({error: 'cant find doggies'});
        }
        console.log(dogs)
        res.json(dogs)
    })
})

server.post('/api/dogPost', (req, res) => {
    let dog = new Dog({
        name: 'Joe',
        breed: 'King Charles Cavalier'
    })
    dog.save((err, post) => {
        if(err) console.log(err)
        res.status(201).json(dog)
    })
})

module.exports = server;