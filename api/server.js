const express = require("express");

const server = express();

server.use(express.json());
server.get("/", (req, res) => {
	res.status(200).json({ message: "server is up and running" });
});
server.get("/api/names", (req, res) => {
	const name = { name: "Kanek" };
	res.status(200).json(name);
});
server.post("/api/:name", (req, res) => {
	const { name } = req.params;
	res.status(201).json(name);
});
server.delete("/api/:id", (req, res) => {
	const { id } = req.params;
	res.status(200).json(id);
});

module.exports = server;