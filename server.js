const express = require('express');



const server = express();

server.get('/', (req, res)=> {
    res.status(200).json({message: "Hi :)"});
});


server.post('/hello', (req, res)=> {
    const name = req.body;
    res.send(201).json({hello: name});
});



module.exports = server;
