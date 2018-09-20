const express = require("express");
const app = express();
const port = 3000;




app.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);

module.exports = app;

// app.listen(port, () => console.log(`app listening on port ${port}!`));
