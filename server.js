const express = require('express');
const server = express();


server.listen(8000, () => console.log('Server running on port 8000'))

module.exports = server;