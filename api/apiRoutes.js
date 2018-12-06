const express = require('express')

const router = express();

router.get('/', (req, res) => {
  res.status(200).json({message: 'this is the users endpoint'})
})

module.exports = router;