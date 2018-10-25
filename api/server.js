const express = require("express");

const server = express();

server.use(express.json());
server.get("/", (req, res) => {
	res.status(200).json({ message: "server is up and running" });
});
server.post("/hello/:firstName", (req, res) => {
	const { lastName } = req.body;
	const { firstName } = req.params;
	if (lastname === "") {
		res.status(200).json({ hello: `${firsName} Stranger` });
	}
	res.status(200).json({ hello: `${firstName} ${lastName}` });
});

module.exports = server;
