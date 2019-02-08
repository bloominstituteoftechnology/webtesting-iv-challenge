const express = require("express");
const users = require("../users/users.js");

const server = express();

server.use(express.json());

server.get("/", async(req, res) => {
   res.status(200).json({api: "running"});
});

server.get('/users', async (req, res) => {
   const rows = await users.getAll();
 
   res.status(200).json(rows);
 });

 server.post("/users", async (req, res) => {
   const userData = req.body;
   if(userData.name){
     const ids = await users.insert(userData);
     res.status(201).json(ids);
   } else {
     res.status(400).json({error: "missing name in body"})
   }
 });

module.exports = server;