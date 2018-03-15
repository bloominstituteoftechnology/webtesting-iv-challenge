const express = require("express");
const morgan = require("morgan");

const server = express();
server.use(morgan("combined"));
server.use(express.json());

const User = require("./users");

server.get("/users", (req, res) => {
	User.find()
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			res.error(err);
		});
});

server.post("/users", (req, res) => {
	const { name, location } = req.body;
	const newUser = new User({ name, location });
	newUser
		.save()
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			res.error(err);
		});
});
server.put("/users", (req, res) => {
	const { name, location } = req.body;
	User.update({ name }, req.body)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			res.error(err);
		});
});

server.delete("/users", (req, res) => {
	const { name, location } = req.body;
	User.find({ name })
		.remove()
		.then(res => {
			res.status(202).json(`Successfully deleted ${name}.`);
		})
		.catch(err => {
			res.error(err);
		});
});

module.exports = server;
