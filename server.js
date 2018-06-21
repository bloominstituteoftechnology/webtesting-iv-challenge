const express = require("express");
const mongoose = require("mongoose");
const server = express();
const User = require("./User");

server.use(express.json());

mongoose.connect("mongodb://localhost/serverTesting", {}, err => {
    if (err) return console.log(err);
    console.log("DB Connected");
});

server.get("/", (req, res) => {
    res.status(200).json({ api: "running!" });
});

server.get("/users", (req, res) => {
    User.find()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.post("/users", (req, res) => {
    const user = new User(req.body);
    user
        .save()
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


server.delete("/users/:id", (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(response => res.json({ status: "success, user deleted" }))
        .catch(err => res.status(500).json(err));
});

if (process.env.NODE_ENV !== "test") {
    server.listen(5000);
}

module.exports = server;