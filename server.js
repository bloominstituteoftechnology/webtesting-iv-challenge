const express = require('express');
const Note = require('./notes/Notes');
const server = express();
server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).json({api: 'running'});
});
// server.post('/notes',  (req,res) => {
    // const newNote = {username: 'NewUser', password: 'pass'}
    // console.log('req, res', newNote);
    //  Note.create(newNote).then(res => console.log('Res: ',res.status(200))).catch(err => console.log('Failed'))
    // const note = new Note(newNote);
    // note
    //     .save()
    //     .then(noteData => {
    //         res.status(200).json(noteData);
    //     })
    //     .catch(err => {
    //         res.status(500).json(err);
    //     });
// });

// server.delete('/notes', (req,res) => {
//     res.status(200).json({delted: res});
// });

// router.post('/', function post(req, res) {
//     const filmsData = req.body;
//     const film = new Film(filmsData);
  
//     film
//       .save()
//       .then(film => {
//         res.status(201).json(film);
//       })
//       .catch(err => {
//         res.status(500).json(err);
//       });
//   });

if (process.env.NODE_ENV !== 'test') {
    server.listen(9000, () => 
    console.log(`\n\nAPI running on http://localhost:${port}`)
);
};
// server.get('POST /notes', () => {
//   res.status(201).json({})
// })

const routes = require('./routes');
server.use('/api', routes);

module.exports = server;