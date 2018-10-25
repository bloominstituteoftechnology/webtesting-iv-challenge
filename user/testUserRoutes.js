const express = require('express')
const router = express.Router()
const db = require('./testUserDataModel')

router.get('/', (req,res) => {
    res.status(200).json({message:'server reached'})
})

router.get('/usernames', (req,res) => {
    db.find().then(users => {
        const usernames = []
        users.forEach(user => usernames.push(user.username))
        res.json({usernames})
    })
})

router.delete('/:id', (req,res) => {
    const {id} = req.params
    db.deleteUser(id).then(deletedNum => {
        res.status(301).json(deletedNum)
    })
})

router.post('/', (req,res) => {
    const creds = req.body
    db.register(creds).then(id => {
        res.status(201).json(id)
    }) 
})



module.exports = router