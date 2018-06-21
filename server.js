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
db.connectTo('database_name')
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
server.get('/', (req, res) => res.send('API Running...'));

/**
 * DEFINE: global Post-Middlewares if any
 */

/**
 *  LAUNCH SERVER:
 */
const port = process.env.PORT || 6666;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
