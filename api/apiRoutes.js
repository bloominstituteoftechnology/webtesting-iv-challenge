const express = require('express')
const router = express();

// this is going to be the live db object
const db = require('./jsonDBLayer')
const testData = require('./testData')
// console.log(db.findById(1))
const getAllUsers = async (req, res) => {
  try {
    const users = testData//await db.getAll()
    
    res.status(200).json(users)
  }
  catch (err) {

  }
}
const getUser = async (req, res) => {
  try {
    const { id } = req.params
    console.log(req.params)
    const user = testData[id-1]//await db.findById(id)
    if (!user) { throw new Error }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({error})
  }

}

const addUser = async (req, res) => {
  try {
    const { id, firstName, age } = req.body
    const user = testData.push({ id: testData.length+1, firstName, age }) //await db.insert({id, firstName, age})
    console.log(testData[testData.length-1]) 
    res.status(201).json(user)
   
  } catch (error) {
    res.status(500).json({error})
  }
}

const updateUser = async (req, res) => {
  try {
    // const user = await db.update(req.body)
    const { id, firstName, age } = req.body
    const updatedUser = {
      id: id !== undefined ? id : testData[id].id,
      firstName: firstName !== undefined ? firstName : testData[id].firstName,
      age: age !== undefined ? age : testData[id].age
    }
    testData[id] = updatedUser 
    const user = [updateUser.id]
    res.status(200).json(user) 
  } catch (error) {
    res.status(500).json({error})
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await db.delete({id})
    
    res.status(200).json(user)    
  } catch (error) {
    res.status(500).json({error})
  }
}

router.get('/', (req, res) => {
  res.status(200).json({message: 'this is the users endpoint'})
})

router.get('/users', getAllUsers)
router.get('/users/:id', getUser)
router.post('/users', addUser)
router.put('/users', updateUser)
router.delete('/users', deleteUser)

module.exports = router;