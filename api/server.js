const express = require("express");
const server = express();

server.use(express.json());


let userDB = [
    {
        "id": 1,
        "username": "Hunter",
        "password": "1234"
    },
    {
        "id": 2,
        "username": "Sandwich",
        "password": "1234"
    },
    {
        "id": 3,
        "username": "Yogurt",
        "password": "1234"
    },
]
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up" });
});


server.post('/users', (req, res) => {
    const { user } = req.body;
    userDB.push(user);
    res.status(201).json({users: userDB});
})

module.exports = server;
