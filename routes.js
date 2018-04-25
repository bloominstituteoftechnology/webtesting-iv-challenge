const express = require('express');
const Woof = require('./woofs/Woof');

const router = express.Router();

router
    .get('/', (req, res) => {
        Woof
            .find()
            .then(woofs => {
                res.status(200).json(woofs);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })
    .get('/:id', (req, res) => {
        const { id } = req.params;

        Woof
            .findById(id)
            .then(woof => {
                if (!woof) {
                    res.status(404).json({ message: 'Woof not found.' })
                } else {
                res.status(200).json(woof);
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })
    .post('/', (req, res) => {
        const woof = new Woof(req.body);
        woof
            .save()
            .then(woofs => {
                res.status(200).json(woofs);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })
    .put('/:id', (req, res) => {
        const { id } = req.params;
        const newWoof = req.body;

        Woof
            .findById(id)
            .then(woof => {
                if (!woof.message) {
                    res.status(404).json({ message: "Woof was not found." });
                } else {
                    Woof
                        .update(woof, newWoof)
                        .then(updatedWoof => {
                            res.status(200).json(updatedWoof)
                        }).catch(err => {
                            res.status(500).json({ message: 'Failed to update woof. Please try again.' })
                        });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })
    .delete('/:id', (req, res) => {
        const { id } = req.params;

        Woof
            .findById(id)
            .then(woof => {
                if (!woof.message) {
                    res.status(404).json({ message: "Woof was not found." });
                } else {
                    Woof
                        .remove(woof)
                        .then(response => {
                            res.status(200).json(response)
                        }).catch(err => {
                            res.status(500).json({ message: 'Failed to delete woof. Please try again.' })
                        });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })



module.exports = router;