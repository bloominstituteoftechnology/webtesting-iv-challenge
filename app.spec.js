const request = require('supertest'); 
const app = require('./app.js'); 



describe('POST /create', function () {

  it('POST', function (done) {
    let doop = {name:'Amon'};
    request(app)
      .post('/create')
      .send(doop)
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });


  
});