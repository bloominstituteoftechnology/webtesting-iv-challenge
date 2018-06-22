const router = require('express').Router();
const secret = "If33lAStho1StrvgGl3w17H7YP05"                 
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

function restricted (req, res, next) {
  const token = req.headers.authorization;
console.log('Look at me, being all restricted')
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      req.jwtPayload = decodedToken
      console.log('decodedtoken', decodedToken)
      if (err) {
        return res.status(401).json({ message: 'You shall not pass!  Your decoder ring has failed thee!'})
      }
      next();
    })
  } else {
    res.status(401).json({ message: "You shall not pass!  Thou hast no token!"})
  }
}

router.get('/', restricted, (req, res) => {
    Cats.find()
        .then(cats => {
            console.log('cats', cats)
            res.json(cats)
        }).catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router