const express = require('express');
const server = express();
const port = 8000;

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(require('cors')());
server.use('/api', require('./api'));

server.get('/', (req, res)=>{
    res.status(200).json({ server: "running" });
});
module.exports =server;
server.listen(port, ()=> console.log(`Server listening on port ${port}`));