const express = require("express");
const app = express();
const port = 3000;
let storage = [];

app.use(express.json());

app.post("/create", (req, res) => {
  if(!req.body.name || !req.body.species){
    res
    .status(400)
    .json({ errorMessage: "Invalid body" })
    return;
  }
  storage.push({... req.body})
  res
    .status(200)
    .json(storage)
    return;
});
app.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);

module.exports = app;

// app.listen(port, () => console.log(`app listening on port ${port}!`));
