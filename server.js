const express = require('express'); // remember to install your npm packages
const helmet = require('helmet');
const db = require('./data/db.js');

/**
 * DEFINE: Server.
 */
const server = express();

/**
 * CONNECT TO DATABASE: Connect to MongoDB.
 */
db.connectTo('API_databaes')
  .then(() => console.log('\n... API Connected to Database ...\n'))
  .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));

/**
 * DEFINE: global Pre-Middlewares is any.
 */
server.use(helmet());
server.use(express.json());

/**
 * DEFINE: Endpoints.
 */
server.get('/', (req, res) => res.send({ status: 'API Running...' }));

/**
 * DEFINE: global Post-Middlewares if any
 */

/**
 *  LAUNCH SERVER:
 *  While testing: do not launch the server, it throws an Error when the test is launched. This Error do not interfere with the test.
 */
// const port = process.env.PORT || 6767;
// server.listen(port, () => {
//   console.log(`Server up and running on ${port}`);
// });

module.exports = server;
