const express = require('express');
const User = require('./users/User')
const server = express();



server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' })
});
server.get('/user', (req, res) => {
    res.status(200).json({ username })
    .catch(err => {
        res.status(500).json({ error: err.message })
    })
});

server.post('/user', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    newUser
        .create()
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ err: err.message })
        })

})

// server.delete('/user', (req, res) => {
//     User.delete(user => {

//     })
// })


server.listen(5000, () => {
    console.log("server listening on port 5000")
})
module.exports = server;

