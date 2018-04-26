const mongoose = require("mongoose");
const server = require("./server");
const port = 5333;

mongoose.connect("mongodb://localhost/animals", {}, err => {
  if (err) return console.log(err);
  console.log("\n === Connected to the database === \n");
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`\n=== Server running at port ${port}===\n`);
});
