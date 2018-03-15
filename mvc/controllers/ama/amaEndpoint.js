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

    if (ama.answer) {
      res.status(422).json({
        message: "Please ensure there isn't an answer field in the body. ",
      });
      return;
    }

    amaController
      .create(ama)
      .then(savedAma => res.status(201).json(savedAma))
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
  update: (req, res) => {
    const { id } = req.params;
    const ama = req.body;

    if (!ama.question && !ama.answer) {
      res
        .status(422)
        .json({ message: 'Please ensure a question or answer is specified.' });

      return;
    }

    if (ama.answer) ama.answered = true;

    amaController
      .update(id, ama)
      .then(updatedAma => {
        if (!updatedAma) {
          res.status(404).json({ message: `No ama with id (${id}) found.` });
          return;
        }

        res.json(updatedAma);
      })
      .catch(err =>
        res
          .status(500)
          .json({ message: `Ama with id (${id}) could not be updated.`, err }),
      );
  },
};
