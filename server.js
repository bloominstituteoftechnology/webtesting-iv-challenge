const express = require('express');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' })
});

server.get('/students', (req, res) => {
    res.status(200).json({students: 'List of students'});
});

server.post('/students', (req, res) => {
    const { student } = req.body;
    
    res.status(201).json({student});
    
});


server.delete("/students/:student", (req, res) => {
    const { student } = req.params;
        
    res.status(200).json({Message: `Deleted ${student}`});
  });

module.exports = server;

