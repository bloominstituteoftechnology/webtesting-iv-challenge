const express = require('express');
const Character = require('./Character.js');
const Film = require('../films/Film.js');

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        if (req.query.minheight) {
            Character
                .find({
                    "$and": [
                        { "height": { "$gt": parseInt(req.query.minheight) } },
                        { "gender": "female" }
                    ]
                })
                .then(response => {
                    res.status(200).json({ data: response })
                })
                .catch(err => res.status(500).json({ data: err }))
        }
        else {
            Character.find({})
                .then(response => {
                    res.status(200).json({ data: response })
                })
                .catch(err => res.status(500).json({ data: err }))
        }
    })


module.exports = router;
