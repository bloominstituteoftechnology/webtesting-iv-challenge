//import server
server = require('./api/server.js');

const PORT = 4000;
server.listen(PORT, ()=>{
  console.log(`Server is up and running on port ${PORT}`);
})