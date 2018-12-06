const express = require('express');
const server = express();

server.use(express.json());

let db = [{_id: 1, name:'yanrong'}, {_id: 2, name: 'kam'}]
let _id = 3;

// api testing
server.get('/', (req, res) => {
    res.status(200).json({api: "running..."})
});

server.get("/users", (_, res) => {
    res.status(200).json(db);
  });
   server.post("/create", (req, res) => {
    const { name } = req.body;
    db.push({ _id, name });
    res.status(201).json({ message: `user ${name} created` });
    _id = _id + 1;
  });


module.exports = server;