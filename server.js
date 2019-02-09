const express = require("express");

const db = [];

const server = express();
server.use(express.json());

server.get("/tasks", (req, res) => {
  res.status(200).json(db);
});

server.post('/tasks', async (req, res) => {
    const task ={
        id: req.body.id,
        taskname: req.body.taskname,
        complete: req.body.completed
    };
    if (!req.body.taskname || !req.body.completed || !req.body.id) {
        res.status(422).json({ message: "Please provide a Taskname if it is completed." });
      } else {
        res.status(200).json(task);
      }
 });
 
 server.delete('/tasks/:id', async (req, res) => {
    db.push({
        id: req.body.id,
        taskname: req.body.taskname,
        complete: req.body.completed
    });
    const numberDeleted = ;
       db.splice(1, numberDeleted);
    res.status(200).json(numberDeleted);
 });

module.exports = server; 