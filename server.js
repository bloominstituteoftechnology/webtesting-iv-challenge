
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

mongoose.connect('mongodb://localhost/jobs');

const Jobs = require('./models');

server.post('/jobs', (req, res) => {
    const job = req.body;
    const newJob = new Jobs(job);

    newJob.save((err, jobs) => {
        if (err) return res.send(err);
        res.send(jobs);
    });
});

server.get('/jobs', (req, res) => {
    Jobs.find({}, (err, jobs) => {
        if (err) return res.send(err);
        res.send(jobs);
    });
});

server.put('/jobs', (req, res) => {
    const { id } = req.params;
    const job = req.body;
    Jobs.findByIdAndUpdate(id, (err, job) => {
        if (err) return res.send(err);
        res.send(id);
    });
})

module.exports = server;