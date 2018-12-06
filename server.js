const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("API is up!");
});

const foods = [
  {
    id: 1,
    name: "Spinach"
  }
]; // created foods array

server.post("/foods", (req, res) => {
  const { name } = req.body;
  const newFood = { name };
  foods.push(newFood);
  res.status(200).json({ message: `${title} has been added.` });
});

server.get("/foods", (req, res) => {
  res.status(200).json(foods);
});

module.exports = server;
