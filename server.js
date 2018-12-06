const server = require('./api/serverframework.js')

server.listen(port, () => {
    console.log(`\n** server up on port ${port} **\n`)
})