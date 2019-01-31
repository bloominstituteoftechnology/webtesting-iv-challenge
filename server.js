const express = require("express");

const server = express();

server.use(express.json());

server.post("/smurfs", (req, res) => {
	let name = req.body.name;
	let role = req.body.role;
	if (!name || !role) {
		return res.json({
			errror: true,
			message: "Please provide a name and role",
		});
	}

	return res.json({ id: 1, name: "Lauren smurf", role: "jerkface" });
});

server.delete("/smurfs", (req, res) => {
	let id = req.body.id;
	if (!id) {
		return res.json({ message: "Please provide id to delete" });
	}
	return res.json({ error: false, id: id, message: "Lauren smurf ded" });
});

module.exports = server;
