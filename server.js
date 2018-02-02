const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const server = express();
server.use(morgan('combined'));
server.use(bodyParser.json());

server.post('/climbs', (req, res) => {
    const { climbingLocation, zipCode, climbingType } = req.body;
   const newClimbingArea = new Climbs({ climbingLocation, zipCode, climbingType });
   newClimbingArea
    .save()
    .then(climb => {
        res.status(201).json(climb);
    }) 
    .catch(error => {
        res.status(422);
        res.json(error);
    });
});

server.put('/climbs/:zip', (req, res) => {
    const { zip } = req.params;
    const { climbingLocation, climbingType } = req.body;
    Climbs.findOne({})
        .where({'zipCode': zip})
        .update({ 
            climbingLocation,
            climbingType
        })
        .then(climb => {
            res.status(200).json(climb);
        })
        .catch(error => {
            res.status(422).json(error);
        });
});

server.get('/climbs', (req, res) => {
    Climbs.find({}, (err, climbs) => {
        if (err) res.status(422).json(err);
        res.json(climbs);
    });
});

server.delete('/climbs/:zip', (req, res) => {
    const { zip } = req.params;
    Climbs.find({})
        .where({ 'zipCode': zip})
        .del()
        .then(res => {
            res.status(200).json('deleted');
        })
        .catch(error => {
            res.status(422).json(error);
        });
});


module.exports = server;