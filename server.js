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
server.post('/', handlePOST);

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

/**
 * ROUTE HANDLERS: define route handlers
 */
function handlePOST(req, res, next) {
  const parameters = req.body;

  const toPost = new db(parameters);
  toPost
    .save()
    .then(newDocument => {
      res.status(201).json(newDocument);
    })
    .catch(e => {
      next(e);
    });
}

module.exports = server;
