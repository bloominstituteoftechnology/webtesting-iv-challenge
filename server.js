const express = require("express");
const morgan = require("morgan");
const server = express();

server.use(express.json());
server.use(morgan("dev"));
const Bands = require("./models/bands");
// ROUTES

// test
server.get("/api/bands", (req, res) => {
    Bands.find({}, (err, bands) => {
        if (err) {
            res.status(500).json({ errorMessage: "Cannot find bands" });
        }

        res.status(200).json(bands);
    });
});

server.get("/api/bands/:id", (req, res) => {
    const id = req.params.id.toString();
    // console.log("----", id);
    Bands.findById(id)
        .then(band => {
            console.log("----", band);
            res.status(200).json(band);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = server;
