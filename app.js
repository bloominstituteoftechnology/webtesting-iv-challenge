const mongoose = require('mongoose');
const server = require('./server');

/* eslint no-console: 0 */
/* eslint no-multi-str: 0 */
/*
(node:10245) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0,
use `openUri()` instead, or set the `useMongoClient` option if using `connect()`
or `createConnection()`.
See http://mongoosejs.com/docs/connections.html#use-mongo-client
                                             vvvvvvvvvvvvvvvvvvvvvvvv
*/
mongoose.connect('mongodb://localhost/food', { useMongoClient: true }, (err) => {
  if (err) return console.log('\nyoYOyo-yo!!! WTF, yo??????\n', err);
  console.log('DUDE! You are like totally connected to the food DataBase, man!\
  \nLike, all your chakras are, like, totally... cool...\
  \ny\'know, like: lined up and in balance, man... Whoa.\n');
});

server.listen(8080, () => {
  console.log("\nYe ol' server is listening on port 8080, me boy-o!\n");
});
