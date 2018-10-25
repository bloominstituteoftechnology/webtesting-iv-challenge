const express = require("express");

const server = express();

server.use(express.json());
server.get("/", (req, res) => {
	res.status(200).json({ message: "server is up and running" });
});
server.post("/api/:book", (req, res) => {
	const { book } = req.params;
	res.status(201).json(book);
});
server.delete("/api/:id", (req, res) => {
	const { id } = req.params;
	res.status(200).json(id);
});

module.exports = server;
