const express = require("express");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
	res.status(200).json({ message: "server is operational" });
});

server.get("/api/todo", (req, res) => {
	const todo = { todo: "Take out trash" };
	res.status(200).json(todo);
});

server.post("/api/:todo", (req, res) => {
	const { todo } = req.params;
	res.status(201).json(todo);
});

server.delete("/api/:id", (req, res) => {
	const { id } = req.params;
	res.status(200).json(id);
});
 
module.exports = server;