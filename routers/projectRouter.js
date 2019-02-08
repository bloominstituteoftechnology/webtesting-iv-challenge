const express = require('express');
const router = express.Router();
const projects = require('../helpers/projectModel')

const sendUserError = (status, msg, res) => {
    res
        .status(status)
        .json({ Error: msg });
};

/************* Delete Project *************/
router.delete('/:id', (req, res) => {
    const { id } = req.params

    if (id) {
        projects.remove(id)
            .then(project => {
                if (project) {
                    res.json({ message: "The project was successfully deleted" });
                } else {
                    res
                        .status(404)
                        .json({ message: "The project with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "The project could not be removed." });
            });
    }
});



/********* Create New Project *************/
router.post('/', async (req, res) => {
    const project = req.body;
    if (project.name && project.description && project.completed) {
       const ids = await projects.insert(project)
            .then(project => {
                res.status(201)
                    .json(ids)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ message: "failed to insert project in db" })
            });
    } else {
        res
            .status(400)
            .json({ message: "missing name, description or completed status." })
    }
});

/* server.post('/hobbits', async (req, res) => {
    const hobbitData = req.body;
  if (hobbitData.name) {
    const ids = await hobbits.insert(hobbitData)
  res.status(201).json(ids);
  } else {
  res.status(400).json({})
  
  }
    res.status(200).json();
  });
  
  module.exports = server; */



module.exports = router;