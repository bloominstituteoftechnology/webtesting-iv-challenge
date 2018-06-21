const router = require('express').Router();
const Drink = require('../models/Drink');

const validateInput = (obj) => {
  const { name, type, alcoholic, description} = obj;
  if (!name || !type) return { error: "Fields 'name' and 'type' are required." };
  if (typeof name !== "string" || typeof type !== 'string' || typeof alcoholic !== 'boolean' || typeof description !== 'string') return { error: "Fields must have appropriate types. \n'name' : 'string' \n 'type' : 'string' \n 'alcoholic' : 'boolean' \n 'description': 'string'"};
  return true;
};

router
  .route('/')
  .get((req, res) => {
    if (req.body.type === "coffee") {
      res.status(418).json({error: "I'm a teapot, so NO COFFEE FOR YOU."});
      return;
    }
    Drink.find(req.body)
      .then(drinks => res.status(200).json(drinks))
      .catch(error => res.status(500).json(error));
  })
  .post((req, res) => {
    const validation = validateInput(req.body);
    if (validation !== true) {
      res.status(400).json(validation);
      return;
    }
    const { name, type, alcoholic, description } = req.body;
    
    Drink.create({ name, type, alcoholic, description})
      .then(drink => res.status(201).json(drink))
      .catch(error => res.status(500).json(error));
  })
  .delete((req, res) => {
    Drink.findOneAndRemove(req.body)
      .then(result => {
        if (!result) {
          res.status(404).json({ error: "Drink not found." });
          return;
        }
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  })

module.exports = router;