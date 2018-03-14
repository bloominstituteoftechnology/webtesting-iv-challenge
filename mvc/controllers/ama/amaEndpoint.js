const ama = require('./amaController');

module.exports = {
  request: (req, res) => {
    res.send(ama.get());
  },
};
