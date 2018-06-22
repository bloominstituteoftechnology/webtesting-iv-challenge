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
server.post('/', validateParameters, handlePOST);

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
  console.log(parameters, parameters == {});
  if (parameters == {}) return res.status(400).json({ Error: 'Data provided must be a JSON object' });
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
/**
 * MIDDLEWARES: Custom middlewears
 */
// If there are missing 'required' fields return an Error else next()
function validateParameters(req, res, next) {
  const parameters = { ...req.body };

  // To 'push' the path that are "required: true"
  let requiredPaths = [];

  // Get Schema paths and path's properties:
  const pathsANDschema = Object.entries(db.schema.paths);

  /**
   * Filter the required paths: and push them to the 'requiredPaths' variable
   */
  pathsANDschema.forEach(entrie => {
    const pathName = entrie[0];
    const pathSchema = entrie[1];
    pathSchema.validators.length === 1 && requiredPaths.push(pathName);

    /**
     * If there a several 'validators': => filter if one of them are of type 'required: true'
     */
    if (pathSchema.validators.length > 1) {
      pathSchema.validators.forEach(validator => {
        validator.type == 'required' && requiredPaths.push(pathName);
      });
    }
  });
  // console.log(requiredPaths.length, requiredPaths);

  /**
   * If there are no missing required paths: ? next() : next('custom-error')
   * If the required field is in the body but has no value: error handle by the Schema validators.
   */
  requiredPaths.length === 0 || !areThereMissingPathsInParams(requiredPaths, parameters)
    ? next()
    : next(createError(400, `The following field are required: ${requiredPaths.join(' ')}`));
}
/**
 * OTHER Helpers: auxiliar functions
 */
function areThereMissingPathsInParams(paths, parameters) {
  let missingFields = false;
  for (let path of paths) {
    if (!parameters.hasOwnProperty(path)) missingFields = true;
  }
  return missingFields;
}

module.exports = server;
