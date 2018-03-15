const amaController = require('./amaController');

module.exports = {
  create: (req, res) => {
    const ama = req.body;

    if (!ama.question) {
      res
        .status(422)
        .json({ message: 'Please ensure a question is specified.' });

      return;
    }

    if (ama.answered) {
      res.status(422).json({
        message: "Please ensure there isn't an answered field in the body. ",
      });
      return;
    }

    amaController
      .create(ama)
      .then(savedAma => res.json(savedAma))
      .catch(err =>
        res.status(500).json({ message: 'Error creating new ama.', err }),
      );
  },
  request: (req, res) => {
    amaController.get(amas => {
      if (amas.length === 0) {
        res.json({ message: 'No amas in database.', amas });
        return;
      }

      res.json(amas);
    });
  },
  requestId: (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(422).json({ message: 'Please provide an id.' });
      return;
    }

    amaController
      .getId(id)
      .then(ama => {
        if (!ama) {
          res
            .status(404)
            .json({ message: `No ama with id (${id}) found.`, ama });
          return;
        }

        res.json(ama);
      })
      .catch(err => {
        res.status(500).json({ message: `Error requesting ama with id ${id}` });
      });
  },
  request1: (req, res) => {
    res.json({ ans: '1111' });
  },
};
