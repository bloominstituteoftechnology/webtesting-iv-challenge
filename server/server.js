const express = require("express");
const routes = require("../routes/routes");
const server = express();

const User = require("../Users/User");

server.use(express.json());

server.get("/", (req, res) => {
	res.status(200).json({ api: "running!" });
});

server.post("/api/users", (req, res) => {
	// console.log(req.body);
	// const { username, password } = req.body;

	// const user = new User({ username, password });

	// user.save((err, user) => {
	// 	if (err) res.send(err);
	// 	res.status(201).json(user);
	// });

	User.create(req.body)
		.then(users => {
			console.log(users);
			res.status(201).json(users);
		})
		.catch(err => {
			console.log(err);
			res.send(err);
		});
});

if (process.env.NODE_ENV !== "test") {
	server.listen(9000);
}

// routes(server);

module.exports = server;
