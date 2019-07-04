const express = require('express');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
  res.status(200).send('API is running');
});

// server.post('/greet/:name', (req, res) => {
// 	const { lastName } = req.body;
// 	const { name } = req.params;

// 	res.status(200).json({ hello: `${name} ${lastName}`});
// });

server.post('/users/:id', (req, res) => {
    const {user, id} = req.body;
    res.status(201).json({ user, id});
})


server.delete('/users/:id', (req, res) => {
    const { id } = req.body;
    res.status(200).json({ id, msg: "user has been removed from list"});
})

module.exports=server;
