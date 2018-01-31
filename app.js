const app = require('./server.js');
const port = 5000;

app.listen(port, () => {
    console.log(`The server is running on port: ${port}`);
});

module.exports = app;