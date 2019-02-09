require('dotenv').config()

const server = require('');

const port = process.env.PORT || 4300;
server.listen(port, () => {
  console.log(`<<=== running sever on port ${port} ===>>`)
})