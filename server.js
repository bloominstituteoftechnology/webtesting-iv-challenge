const express = require('express'); 
const server = express(); 
server.use(express.json())


let foods = [
    { id: 0, dish: "burger" },
    { id: 1, dish: "pizza" }
  ];
  
  server.get("/foods", (req, res) => {
    res.status(200).json(foods);
  });
  server.post("/foods/:id", (req, res) => {
    const { dish } = req.body;
    const id = foods.length;
    foods.push({id, dish});
    res.status(201).json(foods);
  });
  server.delete("/foods/:title", (req, res) => {
      const {id} = req.params; 
      if(foods.find(food => Number(food.id) === Number(id))){
          foods = foods.filter(food => {
              return Number(food.id) !== Number(id); 
          });
          res.status(201).json(foods);
      }else{
          res.status(404).json({message: "id does not exist"})
      }
  });
  module.exports = server;