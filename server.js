const express = require("express");
const mongoose = require('mongoose');
const CharacterRouter = require('./characters/CharacterRouter');


mongoose.connect("mongod://localhost/charDb")
    .then(() => {
        console.log("\n***Connected to database***\n")
    })
    .catch(err =>{
        console.log(err.message);
    })


const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({api: "api running..."});
});


server.use("/api/chars", CharacterRouter )


module.exports = server;