const express = require('express');
const router = express.Router();
const User = require('./usersModel.js')


router.get('/', (req, res) => {
  User
    .find()
    .then(p => {
      res.status(200).json({ msg: p })
    })
    .catch(err => {
      res.status(200).json({ msg: err })
    })



})


router.post('/', (req, res) => {
  const obj = req.body
  // const newUser = User(obj)
  // newUser
  //   .save()
  User
    .create(obj)
    .then(p => {
      res.status(200).json({ msg: 'user successfully added' })
    })
    .catch(err => {
      res.status(500).json({ msg: 'sorry we cant not add this user' })
    })

})

module.exports = router;