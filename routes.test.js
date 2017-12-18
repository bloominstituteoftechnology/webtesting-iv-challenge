const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'); 

const Food = require('./food');
const server = require('./server');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;

chai.user(chaiHTTP); // allows us to mock these requests below

// We want tests to be descriptive as possible
// This function will run before every test we do, that way each test has a clean canvas to start on.

describe('/food', () => {
	beforeEach((done) => { // hook -> before each test runs
		Food.remove({}, (err) => { // clean canvas. - where we start interactin with the db
			if (err) console.log(err); // db is on another server so we need to make a request wihich is asynchronous and so done means to not run the other test until it is finished.
			done(); // a callback function provided by mocha - knows that if the ufnciton is not invoked, it wil not move on.
		});
	});
	
	describe('[GET] /food', () => {
		it('should get all of the food', () => {
			chai // This is making a request
				.request(server)
				.get('/food')
				.end((err, res) => {
					if (err) return console.log(err);
					expect(res.status).to.equal(200);
					expect(Array.isArray(res.body)).to.equal(true);
					expect(res.body.length).to.equal(0);
					done();
				});
		});
	});

	describe('[POST] /food', () => {
		it('should add a new food', () => {
			const food = {
				name: 'Hot Dog'
			};

			chai // This is making a request
				.request(server)
				.post('/food')
				.send(food)
				.end((err, res) => {
					if (err) return console.log(err);
					expect(res.status).to.equal(200);
					expect(res.body.name).to.equal('Hot Dog');
					done();
				});
		});
	});
});