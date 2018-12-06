// Server import
const server = require('./server.js');

// Sets up the port
const PORT = process.env.PORT || 8000;

// Starts up the server
server.listen(PORT, () =>
  console.log(`==== Server running on port ${PORT} ====`)
);
