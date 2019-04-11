const router = require('express').Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const db = require('../../database/dbConfig.js');
// database / dbConfig.js

router.get('/', async (req, res) => {
  try {
    const users = await db('users');
    res.status(200).json({ users });
  } catch (error) {

  }
})

module.exports = router;