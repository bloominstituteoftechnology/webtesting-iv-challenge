const express = require("express");
const port = process.env.PORT || 3334;
const knex = require("knex");
const knexConfig = require("./knexfile");
const server = express();
const db = knex(knexConfig.development);

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ this: "sucks" });
});

server.get("/api/thing", async (req, res) => {
  const things = await db("thing");
  return res.status(200).json(things);
});

server.post("/api/thing", async (req, res) => {
  try {
    const id = await db("thing").insert(req.body);
    res.status(201).json(id);
  } catch (err) {
    res.status(500).send("<h1>ya broke</h1>");
  }
});

server.delete('/api/thing/:id', async (req,res) =>{
    try{
        const {id} = req.params
        const count = await db('thing').where({id}).del()
        if (count){
            res.status(200).send('deleted')
        }
    }catch(err){
            res.status(500).send("<h1>ya broke</h1>");
        }
})
server.listen(port, () => console.log(`we hear you ${port}`));

module.exports = server;
