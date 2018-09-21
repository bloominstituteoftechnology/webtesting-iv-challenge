const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const server = new express();

server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: `It's alive`
  });
});

server.use('/api/notes', require('./routes/notes'))

//server.listen(3000, () => console.log(`SERVER is running`));

module.exports = server