const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('the line is hot');
});

server.listen(8000, () => console.log(`\nserver up on port 8000`));