const express = require("express");
const server = express();

server.use(express.json());

module.exports = server;

let nextId = 2;
let users = [
    {
        id: 1,
        username: "sample user"
    }
];

server.post("/api/users", (req, res) => {
    if (req.body && req.body.username && typeof req.body.username === "string") {
        users.push({ id: nextId, username: req.body.username });
        nextId++;
        res.status(201).json([nextId-1]);
    } else {
        res.status(400).json({ error: "incorrectly formatted user" });
    }
});