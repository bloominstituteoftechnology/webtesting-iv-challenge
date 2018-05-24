const router = require('express').Router();

const Friend = require('./friendModel');

router
    .route('/')
    .post(post)



router
    .route('/:id')
    .delete(deleteid)


function post(req, res) {
    const {age, firstName, lastName, createdOn, contactInfo} = req.body;
    const friendData = {age, firstName, lastName, createdOn, contactInfo};

    const friend = new Friend(friendData);

    if (!req.body) {
        res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
    }
    if(!(typeof age === 'number') || age.length === 0 || age.length > 120) {
        res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
    } else 
    friend
        .save()
        .then(bro => {
            res.status(201).json(bro);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." })
        });
}


function deleteid(req, res) {
    const id = req.params.id;

    if(!Friend.findById(id)) {
        res.status(404).json({ message: "The friend with the specified ID does not exist." })
    }
    Friend.findByIdAndRemove(id)
    .then(remove => {
        res.status(201).json(remove);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The friend could not be removed" })
    });

}


module.exports = router;