const db = require('./testData')
module.exports = {
  insert: (user) => {
    const {id, firstName, age} = user;
    return new Promise((resolve, reject) => {
      db.push({id, firstName, age})
      resolve([id])
    })
  },
  update: (user) => {
  const {id, firstName, age} = user;
  return new Promise((resolve, reject) => {
    if(db[id]) {
    const updatedUser = {
      id: id !== undefined ? id : db[id].id, 
      firstName: firstName !== undefined ? firstName : db[id].firstName, 
      age: age !== undefined ? age : db[id].age
    }
      db[id] = updatedUser
      resolve([id])
  } else {
    reject('user does not exist')
  }
    })
  },
  delete: ({id}) => {
    return new Promise((resolve, reject) => {
      if(db[id]) {
        delete db[id]
        resolve(id)
      } else {
        reject('user does not exist')
      }
    });

  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      resolve(db)
    });
  },
  findById: ({id}) => {
    return new Promise((resolve, reject) => {
      if(db[id]) {
        resolve(db[id])
      } else {
        reject('user does not exist')
      }
    });
  },
}