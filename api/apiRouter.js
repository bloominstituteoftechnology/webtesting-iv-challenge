const router = require('express').Router();

const amaRouter = require('../src/ama/amaRouter');

router.use('/ama', amaRouter);

module.exports = router;
