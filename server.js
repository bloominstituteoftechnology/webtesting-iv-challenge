const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message:'server running'});
});

server.post('/create-character', (req, res) => {
    const character = req.body;
    if(character){
        res.status(200).json({hello:character.name, the:character.race});
    }else{
        res.status(400).json({error:'need to have a character object with name, race, age, and height'});
    }
})

module.exports = server;