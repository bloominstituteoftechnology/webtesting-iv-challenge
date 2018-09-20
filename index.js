const server = require("./server.js");
const PORT = 6000;

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
