const request = require('supertest');
const server = require('./server.js');

describe('test setup is working', () => {
	it('returns a 200 (ok) status code', async () => {
		const response = await request(server).get('/');
		expect(response.status).toEqual(200)
	})
})

describe('POST /users', function() {

  it('responds with json', function(done) {
    request(server)
      .post('/users')
      .send({username: 'testuser', 'email': 'testuser@yahoo.com'})
      .set('Accept', 'application/json')
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.text)
        done();
      });
  });

  it('responds with 400 error if not all information is filled out', function(done){
  	request(server)
  		.post('/users')
  		.send({username: '', email: ''})
  		.expect(400)
  		.end(function(err, res){
  			if (err) return done(err)
  			done()
  		})
  })
});

describe('Delete /users/:id', function() {
	it('deletes a user', function(done) {
		request(server)
			.post('/users')
			.send({username: 'userdelete', email: 'userdelete@yahoo.com'})
			.set('Accept', 'application/json')
			.end(function(err, res){
				const url = res.text
				request(server)
					.del(`/users/${url}`)
					.expect(200)
					.end(function(err, res){
						if (err) return done(err);
						done()
					})
			})
	})
	it('response with 404 no user found to delete', function(done){
		request(server)
			.del('/users/400')
			.expect(404)
			.end(function(err, res){
				if(err) return done(err);
				done()
			});
	})
})






