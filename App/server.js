const express = require('express');
const bodyParser = require('body-parser')
const Mod = require('./sm64mods')

const server = express();
server.use(bodyParser.json());

server.get('/mods', (req, res) => {
    Mod.find({})
        .then((mods) => {
            res.json(mods);
        })
        .catch((err) => {
            res.status(422);
            res.json(err);
        })
})

server.get(`/mods/:id`, (req, res) => {
    const id = req.params.id;
    Mod.findById(id)
        .exec()
        .then((mod) => {
            res.json(mod)
        })
        .catch((err) => {
            res.status(422).json(err);
        })
})

server.post('/mods', (req, res) => {
    const { title, creator, description, uniqueLevels, difficulty } = req.body
    if (!title) {
        res.status(422).json({ Error: 'must provide a title, creator, and uniqueLevels boolean' })
        return;
    }
    const mod = new Mod({ title, creator, description, uniqueLevels, difficulty });
    mod.save()
        .then((modBack) => {
            res.json(modBack);
        })
        .catch((err) => {
            res.status(422).json(err);
        })
})

server.put(`/mods/:id`, (req, res) => {
    const { userRating, text } = req.body;
    const id = req.params.id;
    if (!userRating || !text) {
        res.status(422).json({ Error: "you must provide a rating and a comment" })
    }
    Mod.findByIdAndUpdate(id)
        .exec()
        .then((mod) => {
            mod.reviews.push({ userRating, text });
            mod.save()
                .then((modSaved) => {
                    res.json(modSaved);
                })
        })
        .catch((err) => {
            res.status(422).json(err);
        })
})

server.delete(`/mods/:id`, (req, res) => {
    const id = req.params.id;
    Mod.findByIdAndRemove(id)
        .exec()
        .then((mod) => {
            res.json(mod)
        })
        .catch((err) => {
            res.status(422).json(err);
        })
})

module.exports = server;