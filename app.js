const mongoose = require("mongoose");
const server = require("./server");

mongoose.connect("mongodb://localhost/bands", {}, err => {
    if (err) console.log(err);
    console.log("\n=== Connected to Mongo ===\n");
});

const port = 5000;

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`\n=== Listening on port ${port} ===\n`);
});
