const express = require('express');
const server = express();

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/servertestDB');

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = server;
