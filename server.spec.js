const request = require('supertest');

const server = require('./server');

describe('server', () => {
  it('should return Ok and a json object from the index route', async () => {
    const expectedBody = { api: 'running' };

    const response = await request(server).get('/');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(expectedBody);
  });
});
// describe('POST /notes', function() {
//   it('saves new note', function(done) {
//     request(server).post('/notes')
//     .send({username: 'NewUser', password: 'pass'})
//     // .set('Accept', 'application/json')
//     .expect(200)
//     .end(function(err, res) {
//       if (err) return done(err);
//       done();
//     });
//   }) 
// })
// describe('Post', () => {
//   it('Testing post', async () => {
//     const expectedBody = ({username: 'NewUser', password: 'pass'});

//     const response = await request(server).post('/notes');

//     expect(response.status).toEqual(200);
//     expect(response.type).toEqual('application/json');
//     expect(response.body).toEqual(expectedBody);
//   });
// })

module.exports = server