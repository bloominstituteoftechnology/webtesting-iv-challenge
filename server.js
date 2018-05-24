const express = require('express');
const server = express();
const User = require('./Users/User')
server.use(express.json());
const mongoose = require('mongoose')

server.get('/', (req, res) => {
    res.status(200).json({api: "running"})
});

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

if(process.env.NODE_ENV !== 'test') {
    server.listen(5000, () => {console.log('server listenin on port 5000')})
}

module.exports = server