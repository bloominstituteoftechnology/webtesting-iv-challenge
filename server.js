const express = require('express');

const Show = require('./models');

const server = express();
server.use(express.json());

const postShow = (req, res) => {
   const show = req.body;
   const newShow = new Show(show);
   newShow
      .save()
      .then(savedShow => {
         res.status(200).send(savedShow);
      })
      .catch(err =>
         res.status(422).send({ error: 'error saving the new show info' })
      );
};

const getShowInfo = (req, res) => {
   const { name } = req.body;
   Show.find({ name })
      .then(showInfo => {
         res.status(200).send(showInfo);
      })
      .catch(err => {
         res.status(422).json({ error: 'error finding the show' });
      });
};

const getAllShows = (req, res) => {
   Show.find({})
      .then(shows => res.json(shows))
      .catch(err => console.err(err));
};

server.route('/show').post(postShow);
server.route('/show').get(getShowInfo);
server.route('/shows').get(getAllShows);

module.exports = server;
