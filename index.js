const express = requires('express');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).json({api: 'up'});
});

const port = 9000;
server.listen(port, () => {
    console.log('listening on port 9000');
})