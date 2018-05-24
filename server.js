const express = require('express');
const server = express();
const User = require('./Users/User')
server.use(express.json());
const mongoose = require('mongoose')

server.get('/', (req, res) => {
    res.status(200).json({api: "running"})
});

server.get('/users', (req, res) => {
    User.find().then(users => {
        res.status(200).json(users)
    })
})

mongoose.connect('mongodb://localhost/test-server').then(console.log("Connected to db"))


server.post('/', (req, res) => {
    let user = req.body;
    user = new User(user)

    user.save().then(user => {
        res.status(200).json(user)
    }).catch(err => {
        res.send(err)
    })
})

server.delete(`/:id`, (req, res) => {
    let id = req.query.id;
    User.findByIdAndRemove(id).then(success => {
        res.status(200).json({message: "Deleted"})
    })
})

if(process.env.NODE_ENV !== 'test') {
    server.listen(5000, () => {console.log('server listenin on port 5000')})
}

module.exports = server