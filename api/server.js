
const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).json({ api: 'up' });
});

server.post('/api/books', (req, res) => {
    const { title } = req.body;
    if(!title){
        res.status(400).json({message: 'please enter a title' })
    } else {
       res.status(200).json({ title }); 
    }
    
})

server.delete('/api/books/:id', (req, res) => {
    res.status(200).json({ message: 'this title was successfully deleted' })
})



module.exports = server;

