const goftRouter = require('./gameofthrones/routes');

module.exports = app => {
  app.use('/api', goftRouter);
};
