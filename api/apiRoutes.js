const express = require('express')
const router = express();

const db = require('./jsonDBLayer')

router.get('/', (req, res) => {
  res.status(200).json({message: 'this is the users endpoint'})
})

// router.get('/users')

module.exports = router;