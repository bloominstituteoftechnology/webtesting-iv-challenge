const app = require('./server');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/db', { useMongoClient: true });
const port = 5000;

app.listen(port, (req, res) => {
     console.log(`server running on port ${port}`);
});
