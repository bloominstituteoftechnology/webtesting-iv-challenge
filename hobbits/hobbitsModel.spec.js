const hobbits = require('./hobbitsModel');
const db = require('../data/dbConfig.js');
const request = require('supertest');
const server = require('./hobbitsRoutes.js');

// beforeEach(async ()=> {
//     await db('hobbits').truncate();
// });

// describe('hobbits model', ()=> {
//     it('should insert provided hobbit', async ()=> {
//         let rows = await db('hobbits').where({name: 'Sam'});
//         expect(rows).toHaveLength(0);

//         await hobbits.insert({ name: 'Sam' })
//         await hobbits.insert({ name: 'Frodo' })
//         await hobbits.remove(1)
//         await hobbits.insert({ name: 'Gandalf'})
//         await hobbits.insert({ name: 'Aragon' })
       

//         rows = await db('hobbits').where({ name: 'Frodo' });
//         expect(rows).toHaveLength(1);

//         rows = await db('hobbits');
       
//         expect(rows).toHaveLength(3);

//     })
// })

describe('hobbits database endpoint', ()=> {
    describe('POST /test', function () {
        it('should echo the response', function (done) {
          request(server)
            .post('/hobbits')
            .send({name: "Sam"})
            .expect(201, {
              name: "Sam"
            }, done)
        })
    })

    describe('DELETE /test', function () {
        it('should echo the response', function (done) {
          request(server)
            .delete('/hobbits')
            .send({name: "Sam"})
            .expect(201, {
              name: "Sam"
            }, done)
        })
      })
})
