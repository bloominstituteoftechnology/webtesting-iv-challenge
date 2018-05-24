const express = require('express');
const Game = require('../videogames/videogames');

const router = express.Router();

router
    .get('/', (req, res) => {
        Game
            .find()
            .then(games => {
                res.status(200).json(games);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })
    .get('/:id', (req, res) => {
        const { id } = req.params;

        games
            .findById(id)
            .then(game => {
                if(!game) {
                    res.status(404).json({ message: 'Game was not found' })
                } else {
                    res.status(200).json(game);
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })
    .post('/', (req, res) => {
        const game = new Game(req.body);
        game
            .save()
            .then(game => {
                res.status(200).json(woof);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })
    .put('/:id', (req, res) => {
        const { id } = req.params;
        const newGame = req.body;

        Game
            .findById(id)
            .then(game => {
                if (!game) {
                    res.status(404).json({ message: 'Game was not found' });
                } else {
                    Game
                        .update(game, newGame)
                        .then(updatedGame => {
                            res.status(200).json(updatedGame)
                        }).catch(err => {
                            res.status(500).json({ message: 'Failed to update game' })
                        });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })
    .delete('/:id', (req, res) => {
        const { id } = req.params;

        Game
            .findById(id)
            .then(game => {
                if (!game) {
                    res.status(404).json({ message: 'Game was not found' });
                } else {
                    Game 
                        .remove(game)
                        .then(response => {
                            res.status(200).json(response)
                        }).catch(err => {
                            res.status(500).json({ message: 'Failed to delete game.' })
                        });
                }
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })

module.exports = router;