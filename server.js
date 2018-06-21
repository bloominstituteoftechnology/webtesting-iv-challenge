/* Dependencies */
const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');
// const morgan = require('morgan');

/* Server */
const server = express();
// General Middleware
// server.use(helmet());
// server.use(cors());
// server.use(morgan());
server.use(express.json());

/* Routes */

server.get('/', (req, res) => {
  res.status(200).json({ api: "is running" });
});

/* Server Listen START! */
// const port = process.env.PORT || 5500;
// server.listen(port, () => {
//   console.log(`\n*** API running on part ${port} ***\n`);
// });

module.exports = server;