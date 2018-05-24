const server = require("./server/server");
const mongoose = require("mongoose");
const port = process.env.PORT || 9000;

mongoose.connect("mongodb://localhost/testing-users");

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
