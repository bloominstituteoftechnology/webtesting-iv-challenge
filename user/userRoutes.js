const express = require('express')
const router = express.Router()
const db = require('./userDataModel')

router.get('/', (req,res) => {
    res.status(200).json({message:'server reached'})
})

router.get('/')



module.exports = router