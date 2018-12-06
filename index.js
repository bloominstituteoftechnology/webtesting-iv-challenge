const server = require("./api/server");
const port = process.env.PORT || 3500;

server.listen(port, () => {
  console.log(`\nserver is live on ${port}\n`);
});
