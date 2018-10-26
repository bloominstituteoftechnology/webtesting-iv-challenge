const express = require('express');

const server = express();

const db = require('./apiModel');

server.use(express.json());

server.get('/api', (req, res) => {
    res.status(200).json({ message: 'server is up' });
});

server.get('/api/students', (req, res) => {
    db
        .find()
        .then(students => {
            res.status(200).json(students);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.get('/api/students/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(student => {
            res.status(200).json(student);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.post('/api/students', (req, res) => {
    const student = req.body;

    db
        .add(student)
        .then(ids => {
            if (!student.class || !student.name) {
                res.status(400).json({ error: "Please provide more information" });
            }
            res.status(201).json(ids[0]);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db
        .update(id, changes)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: "Could not update" });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;

    db
        .remove(id)
        .then(count => {
            if (!count || count < 1) {
                res.status(404).json({ message: "Could not remove" });
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = server;