
const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

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

module.exports = server;