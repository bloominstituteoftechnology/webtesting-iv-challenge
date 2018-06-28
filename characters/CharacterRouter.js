const router = require('express').Router();
const Character = require('./Character');

router.post('/', (req, res) => {
    Character.create(req.body)
        .then(character => {
            res.status(201).json(character);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
});

router.get('/', (req, res) => {
    Character.find()
        .then(character => {
            res.status(200).json(character);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
});

module.exports = router;
