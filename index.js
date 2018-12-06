const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`Server listening on port: ${port}`));
