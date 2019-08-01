const express = require("express");

const server = express();
server.use(express.json());

const db = { countries: ["USA", "Canada", "Mexico"] };

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/countries", (req, res) => {
  res.status(200).json(db);
});

server.post("/countries", (req, res) => {
  const { country } = req.body;
  if (!country) {
    res.status(422).json({ message: `need country bro` });
  }
  res.status(201).json({ country });
});

server.delete("/countries/:country", (req, res) => {
  const { country } = req.params;

  if (!db.countries.includes(country)) {
    res.status(422).json({ message: `country does not exist in database` });
  } else {
    res.status(200).json({ message: `Success in deleting ${country}` });
  }
});

module.exports = { server, db };
