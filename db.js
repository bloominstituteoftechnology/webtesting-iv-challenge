const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/server-testing');
const db = mongoose.connection;
db.on('error', () => console.error.bind(console, 'connection error'));

module.exports = db;