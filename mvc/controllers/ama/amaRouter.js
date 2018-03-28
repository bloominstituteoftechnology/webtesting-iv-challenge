const router = require('express').Router();

const endpoint = require('./amaEndpoint');

router.route('/').get(endpoint.request);

router
  .route('/:id')
  .get(endpoint.requestId)
  .put(endpoint.update)
  .delete(endpoint.del);

router.route('/question').post(endpoint.create);

module.exports = router;
