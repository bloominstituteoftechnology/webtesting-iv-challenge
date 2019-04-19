const express = require("express");

const server = express();

 server.use(express.json());

 module.exports = server;

 server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});


let hobbits = [
    {
        id: 1,
        hobbitName: "sam"
    }
];
let nextHobbit = 2;

 server.post("/api/hobbits", (req, res) => {
    if (req.body && req.body.hobbitName && typeof req.body.hobbitName === "string") {
        hobbits.push({ id: nextHobbit, hobbitName: req.body.hobbitName });
        nextHobbit++;
        res.status(201).json([nextHobbit-1]);
    } else {
        res.status(400).json({ error: "wrong hobbit" });
    }
});

 server.delete("/api/hobbits/:id", (req, res) => {
    let hobbitExists = false;
    let hobbitIndex = undefined;
    hobbits.forEach((hobbit, index) => {
        if (hobbit.id === parseInt(req.params.id)) {
            hobbitIndex = index;
            hobbitExists = true;
        }
    });

     if (hobbitExists) {
        hobbits.splice(hobbitIndex, 1);
        res.status(200).json(1);
    } else {
        res.status(404).json({ error: "hobbit is not found" });
    }
}); 