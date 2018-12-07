const express = require("express");

const server = express();

server.use(express.json());

const db = require("../data/dbConfig.js");

// Sanity check endpoint
server.get("/", (req, res) => {
    res.status(200).json({ api: "Up and running" });
});

// Other endpoints
server.post("/api/firefly", (req, res) => {
    db("firefly")
        .insert(req.body)
        .then(idReturned => {
            res.status(201).json(idReturned)
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

server.delete("/api/firefly/:id", (req, res) => {
    db("firefly")
        .delete(req.params.id)
        .then(count => {
            if (count) {
                res.status(200).json({ num: count });
            } else {
                res.status(404).json({ error: "That id doesn't exist" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

// const port = process.env.PORT || 9000;

module.exports = server;