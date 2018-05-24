const express = require('express');

const server = express();

const User = require('../User');

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running!' });
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(9000);
}
server.post('/', (req, res) => {
    const { body } = req;
  
    if (!body.name) {
      res.status(400).json({ message: 'Project name is required.' });
    } else if (body.name.length > 128) {
      res
        .status(400)
        .json({ message: 'Project name is limited to 128 characters' });
    } else if (!body.description) {
      res.status(400).json({ message: 'Project Description is required' });
    } else if (body.description.length > 128) {
      res
        .status(400)
        .json({ message: 'Project description is limited to 128 characters' });
    } else if (body.completed && typeof body.complete !== 'boolean') {
      res.status(400).json({
        message:
          'Complete flag is not required, but if supplied must be true or false.',
      });
    } else {
      User
        .insert(body)
        .then(newProject => {
          res.json(newProject);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    }
  });
  server.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    User
      .remove(id)
      .then(count => {
        if (count > 0) {
          User
            .get()
            .then(projects => {
              res.json(projects);
            })
            .catch(error => res.status(500).json(error));
        } else {
          res
            .status(404)
            .json({ message: `Project with id ${id} does not exist.` });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

module.exports = server;