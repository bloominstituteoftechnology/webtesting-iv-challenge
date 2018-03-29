const express = require('express');
const morgan = require('morgan');
const PORT = 3030;
const server = express();
server.use(express.json());
server.use(morgan('combined'));
const mongoose = require('mongoose');
const Painter = require('./painterModels')

// mongoose.connect('mongoDB://localhost:/painters', () => {
//   console.log("MongoDB active!...Collection is called 'painters'.");
// });

server.post('/painter', (req,res) => {
  // res.json(req.body);
  const painter = new Painter({
    name: req.body.name,
    style: req.body.style
  })
  .save()
  .then(sG => res.json(sG))
  .catch(err => res.status(404).json({error: err}));
});


server.get('/allPainters', (req,res) => {
  // const send = (sg) => {
  //   res.json(sg);
  // };
  // Painter.getAllPainters(send);
  Painter.find({}, (err, ptr) => {
    if(err) res.status(422).json({error: err});
    res.json(ptr);
  })
  // .then(sG => res.send(sG))
  // .catch(err => res.status(422).json({error: err}));
  // res.json("test");
});

// server.get('/painterTest', (req, res) => {
//   Painter.findOne({ name: 'Franz Kline' })
//     .then(ptr => {
//       const name = ptr.getPainterName();
//       res.send(name);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });


server.listen(PORT || process.env.port, () => {
  console.log("this shit works");
})


module.exports = server;