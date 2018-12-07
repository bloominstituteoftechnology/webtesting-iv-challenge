// WEB API ARCHITECTURE
// ==============================================
const app = require('express')();

require('./api/routes')(app);

module.exports = app;

// START THE WEB API
// ==============================================
app.listen(port, () => console.log(`\n=== Web API listening on http://localhost:${port} ===\n`));
