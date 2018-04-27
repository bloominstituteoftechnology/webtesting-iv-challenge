const express = require('express');

const UserModel = require('./userModel');

const router = express.Router();

// /api/users end points
// router
//   .route('/')
//   .get((req, res) => {
//     UserModel.find({})
//       .then(users => {
//         console.log('UUUUUU', users);
//         if (users.length === 0) {
//           return res.status(404).json({ error: 'No Users found!' });
//         }
//         res.status(200).json(users);
//       })
//       .catch(err => {
//         res.status(500).json(err);
//       });
//   })
//   .post((req, res) => {
//     console.log('DELETE ALL OTHER LOGS');
//     const newUser = req.body;
//     // check for username, password, firstname and lastname
//     if (newUser.username === undefined) {
//       return res.status(422).json({ error: 'Please provide a username' });
//     }
//     if (newUser.password === undefined) {
//       return res.status(422).json({ error: 'Please provide a password' });
//     }

//     if (newUser.firstname === undefined) {
//       return res.status(422).json({ error: 'Please provide a first name' });
//     }
//     if (newUser.lastname === undefined) {
//       return res.status(422).json({ error: 'Please provide a last name' });
//     }

//     const user = new UserModel(newUser);
//     console.log('UUUUUU', user);
//     user
//       .save()
//       .then(insertedUser => {
//         console.log('UUUUUU222222222', insertedUser);
//         res.status(201).json(insertedUser);
//       })
//       .catch(err => {
//         res.status(500).json(err);
//       });
//   });

router.route('/').post((req, res) => {
  consol.log('JUST A TRY');
});
module.exports = router;
