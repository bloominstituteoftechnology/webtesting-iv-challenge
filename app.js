const mongoose = require('mongoose');
const server = require('./server');

// mongoose.connect('mongodb://localhost/players', {}, () => {
// 	console.log('connected to mongo! connected to players db!');
// });

// mongoose.models = {};
// mongoose.modelSchemas = {};

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/players', { useMongoClient: true });

server.listen(8080, () => {
	console.log('server listening on port 8080 :D!');
});