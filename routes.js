const express = require('express');
const router = express.Router();
const Notes = require('./notes/Notes');

router.get('/notes', (req,res) => {
    Notes   
        .find()
        .then(noteData => {
            res.status(200).json({succes: noteData})
        })
        .catch(err => {
            res.status(200).json({error: err})
        });
});

router.post('/notes', (req,res) => {
    const newNote = req.body;
    Notes
        .create(newNote)
        .then(noteData => {
            res.status(200).json({succes: noteData})
        })
        .catch(err => {
            res.status(500).json({error: err})
        });
});

module.exports = router;