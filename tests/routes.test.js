const mongoose = require('mongoose');
// mongoose.models = {};
// mongoose.modelSchemas = {};

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/playersTest', { useMongoClient: true });

const Player = require('../models/player');

const server = require('../server');

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');

// Add promise support if this does not exist natively.
// might need this
// if (!global.Promise) {
//   var q = require('q');
//   chai.request.addPromises(q.Promise);
// }

chai.use(chaiHTTP);

// global variables for creating player objects
const validPlayer = {
	firstName: 'Sean',
	lastName: 'Taylor',
	position: 'safety',
	team: 'Miami Hurricanes',
	age: 31
}

const invalidPlayer = {
	firstName: 'Sean',
	position: 'safety',
	team: 'Miami Hurricanes',
	age: 31
}

describe('/players', () => {
	// before each route tear down player documents
	beforeEach((done) => {
		Player.remove({}, (err) => {
			if (err) console.log(err);
			done();
		});
	});

	describe('[GET] /players', () => {
		it('should return all the player objects', () => {
			chai.request(server)
			.get('/players')
				.then(res => {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
		     })
				.catch(function (err) {
					throw err;
				})
		});
	});

	// test post a player (creating a player)
	// should take a json object with a firstName, lastName, etc...
	// test status equal to 200
	// test the type or value of each of player object attributes

	// do a failing bad payload test
	describe('[POST] /players', () => {
		it('should create a new player object, store it as a mongo document, and return { "success" : true }', () => {
			chai.request(server)
			.post('/players')
			.send(validPlayer)
				.then(res => {
					expect(req.body).to.have.all.keys(['firstName', 'lastName']);
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res).to.be.equal({ "success" : true });
		     })
				.catch(err => {
					throw err;
				})
		});
	});


	// PUT testing
	describe('[PUT] /players/:playerId', () => {
		it('should update a player object', () => {
			let player = new Player(validPlayer);
			player.save()
				.then(player => {
					chai.request(server)
					.put(`/players/${playerId}`)
					.send({age: 32}) // change players age to 32
						.then(res => {
							// expect(req.body).to.have.all.keys(['age'])
							expect(res).to.have.status(200);
							expect(res).to.be.json;
							expect(res).to.be.equal({ "success" : true });
						})
						.catch(err => {
							console.log(err);
						})
				})
				.catch(err => console.log(err))
		})
	});


	// DELETE testing
	// test given a valid playerId
	// test given an invalid playerId
	describe('[DELETE] /players/:playerId', () => {
		it('should remove the player documnet from mongo database', () => {
			let player = new Player(validPlayer);
			player.save()
				.then(player => {
					chai.request(server)
						.delete(`players/${player.id}`)
							.then(res => {
								expect(res).to.have.status(200);
								expect(res).to.be.json;
								expect(res).to.be.equal({ "success" : true });
							})
							.catch(err => console.log(err))
				})
				.catch(err => console.log(err))
		})
	})
});






