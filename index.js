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

server.delete('/api/thing/:thing', async (req,res) =>{
    try{
        const  {thing}  = req.params
        const count = await db('thing').where({this:thing}).first().del()
        if (count){
            res.status(200).send('deleted')
        }
    }catch(err){
            res.status(500).send("<h1>ya broke</h1>");
        }
}) 

server.get('/api/ids', async(req,res) =>{
    try{
        const ids = await db.select('id').from('thing')
        res.status(200).send(ids.map(id=>id.id))
    }catch(err){
        res.status(500).send('ya broke')
    }
})
server.listen(port, () => console.log(`we hear you ${port}`));

module.exports = server;
