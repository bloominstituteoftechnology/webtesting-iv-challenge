const router = require('express').Router();
const User = require('./User');

router
    .route('/')
    .get((req, res) => {
        User
            .find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(500).json({ error: "the user information could not be received" })
            })
    })
    .post((req, res) => {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        if(!username || !password){
            res.status(400).json({ error: "Please provide a username and password to create User" });
            return;
        }
        newUser
            .save()
            .then(savedUser => {
                res.status(201).json(savedUser);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    })

router
    .route('/:id')
    .get((req, res) => {
        User
            .findById(req.params.id)
            .then(user => {
                if(!user){
                    res.status(404).json({ error: "The friend with the specified id does not exist" })
                } else {
                    res.status(200).json(friend);
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The user info could not be retrieved" })
            })
    })
    .delete((req, res) => {
        User
            .findByIdAndRemove(req.params.id)
            .then(user => {
                if(user){
                    res.status(200).json({ success: `User with id ${req.params.id} has been removed from the database.` })
                } else {
                    res.status(404).json({ error: "The user with the specified id does not exist" })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The user could not be removed" })
            })
    })

module.exports = router;