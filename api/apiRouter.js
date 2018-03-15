const router = require('express').Router();

const amaRouter = require('../mvc/controllers/ama/amaRouter');

router.use('/ama', amaRouter);

router.route('/').get((req, res) => {
  res.json({ api: 'route GET' });
});

module.exports = router;
