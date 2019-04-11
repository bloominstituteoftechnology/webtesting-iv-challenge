const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const db = require("./data/config");

const server = express();

//Middleware
const middleware = [express.json(), helmet(), cors()];
server.use(middleware);

//Routes Middleware

server.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome, please refer to the GitHub docs to get started."
  });
});

server.post("/smurfs", async (req, res) => {
  const smurf = req.body;
  try {
    const [id] = await db("smurfs").insert(smurf);
    const newSmurf = await db("smurfs")
      .where({ id })
      .first();
    res.status(200).json(newSmurf);
  } catch (error) {
    console.error("POST_ERROR", error);
    res
      .status(500)
      .json({ message: "Something went wrong with smurf creation." });
  }
});

server.delete("/smurfs/:id", async (req, res) => {
  const id = req.params;
  try {
    await db("smurfs")
      .where({ id })
      .del();
    res.status(200).end();
  } catch (error) {
    console.error("DELETE_ERROR", error);
    res
      .status(500)
      .json({ message: "Something went wrong deleting the smurf." });
  }
});

module.exports = server;
