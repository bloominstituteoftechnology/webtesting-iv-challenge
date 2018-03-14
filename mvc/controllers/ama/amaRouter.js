const router = require('express').Router();

const endpoint = require('./amaEndpoint');

router.route('/').get(endpoint.request);

module.exports = router;
