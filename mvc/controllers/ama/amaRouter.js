const router = require('express').Router();

const endpoint = require('./amaEndpoint');

router.route('/').get(endpoint.request);

// router.route('/1').get(endpoint.request1);

router.route('/question').post(endpoint.create);

router.route('/:id').get(endpoint.requestId);

module.exports = router;
