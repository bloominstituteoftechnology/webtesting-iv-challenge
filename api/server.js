const express = require("express");
const server = express();
server.use(express.json());
const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

server.get("/", (req, res) => {
  res.status(201).json({ api: "up and running" });
});

server.post("/users", (req, res) => {
    const name= req.body;
    db('users')
        .insert(name)
        .then(id=>{
            res.status(201).json(id)
        })
        .catch(error=>{
            res.status(500).json({message:"error adding new user", error});
        })
});
server.post("/users", (req,res)=>{
    const id= req.body;
    db('users')
        .where('users.id',id)
        .delete()
        .then(user=>res.status(201).json({message: "delete successful"}))
})
module.exports=server;