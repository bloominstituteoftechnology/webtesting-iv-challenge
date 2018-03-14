const router = require('express').Router();

const amaRouter = require('../mvc/controllers/ama/amaRouter');

router.use('/ama', amaRouter);

module.exports = router;
