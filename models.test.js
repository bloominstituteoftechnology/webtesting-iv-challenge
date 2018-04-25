// const mongoose = require('mongoose');
// const chai = require('chai');
// const chaiHTTP = require('chai-http');

// mongoose.connect('mongodb://localhost/metatest', () => {
//   if (err) return console.log(err);
//   console.log('Connected to TEST DB');
// });

// const expect = chai.expect;
// const server = require('./server.js');
// const Deck = require('./Deck.js');

// chai.use(chaiHTTP);

// describe('MTG META', () => {
//   let DeckId;
//   beforeEach(done => {
//     const newDeck = new Deck({
//       name: 'Binkus',
//     });
//     newDeck.save((err, savedDeck) => {
//       if (err) {
//         console.log(err);
//         return done();
//       }
//       DeckId = savedSata._id;
//       done();
//     });
//   });

//   afterEach(done => {
//     Deck.remove({}, err => {
//       if (err) console.log(err);
//       done();
//     });
//   });

//   describe('[GET] /api/Decks', () => {
//     it('should get a list of all Decks', done => {
//       chai
//         .request(server)
//         .get('/api/Decks')
//         .end((err, res) => {
//           if (err) {
//             // assert that err should be type status
//             console.log(err);
//             done();
//           }
//           expect(res.status).to.equal(200);
//           done();
//           console.log(res);
//         });
//     });
//   });
// });

//check if array
//check if 200
//check body
//check id
