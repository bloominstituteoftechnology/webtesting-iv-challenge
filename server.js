const express = require('express');
const bodyParser = require('body-parser');
const Card = require('./card');
const mongoose = require('mongoose');

const server = express();
server.use(bodyParser.json());

mongoose.Promise = global.Promise;


server.get('/cards', (req, res) => {
    Card.find({}, (err, cards) => {
        if (err) return res.send(err);
        else res.send(cards);
    })
});
server.get('/card/:name', (req, res) => {
    let name = req.params.name;
    name = name.split('+').join(' ');
    Card.findOne({ name }, (err, card) => {
        if (err) return res.status(422).send(err);
        else res.send(card);
    })
});
server.delete('/card/:name', (req, res) => {
    let name = req.params.name;
    name = name.split('+').join(' ');
    Card.findOneAndRemove({ name }, (err, card) => {
        if (err) return res.status(422).send(err);
        else res.send({success: true});
    });
});
server.put('/card/:name', (req, res) => {
    let name = req.params.name;
    const tag = req.body.tag;
    name = name.split('+').join(' ');
    Card.findOne({ name }, (err, card) => {
        if (err) return res.status(422).send(err);
        let tags = [];
        if (card.tags) tags = card.tags;
        tags.push( tag );
        Card.findOneAndUpdate(
            { name },
            { $set: { tags } }, { new: true }).exec()
            .then((updatedCard) => {
                res.send(updatedCard);
            })
            .catch((err) => {
                res.status(422).send(err);
            })
    })
});

server.post('/cards', (req, res) => {
    const { name, manaCost, tags } = req.body;
    const card = new Card({ name, manaCost, tags });
    card.save((err, newCard) => {
        if (err) return res.send(err);
        else res.send(newCard);
    });
});

module.exports = server;