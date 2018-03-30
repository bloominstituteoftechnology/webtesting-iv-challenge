const express = require('express');
const morgan = require('morgan');
const Show = require('./models');

const server = express();
server.use(morgan('combined'));
server.use(express.json());

const postShow = (req, res) => {
   const { name, year } = req.body;
   const newShow = new Show({ name, year });
   newShow
      .save()
      .then(savedShow => {
         res.status(200).send(savedShow);
      })
      .catch(err =>
         res.status(422).send({ error: 'invalid input error' })
      );
};

const getShowInfo = (req, res) => {
   const { name } = req.body;
   Show.find({ name })
   .then(showInfo => {
      console.log('name is', name);
         res.status(200).send(showInfo);
      })
      .catch(err => {
         res.status(422).json({ error: 'error finding the show' });
      });
};

const getAllShows = (req, res) => {
   Show.find({})
      .then(shows => res.json(shows))
      .catch(err => res.status(422).json(err));
};

const updateShow = (req, res) => {
   const { name, year, id } = req.body;
   Show.findById(id, (err, show) => {
      if (err) {
         res.status(422).json({ error: 'Show not found by that Id' });
         return;
      }
      if (name) show.name = name;
      if (year) show.year = year;

      show.save((error, savedShow) => {
         if (error) res.status(500).json(error);
         res.json(savedShow);
      });
   });
};

server.route('/show').post(postShow);
server.route('/show').get(getShowInfo);
server.route('/shows').get(getAllShows);
server.route('/show').put(updateShow);

module.exports = server;
