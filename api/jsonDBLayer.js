const testData = require('./testData')
module.exports = {
  insert: (user) => {
    const {  firstName, age } = user;
    return new Promise((resolve, reject) => {

      testData.push({ id: testData.length+1, firstName, age })
      resolve(testData[testData.length-1].id)
    })
  },
  update: (user) => {
    const { id, firstName, age } = user;
    return new Promise((resolve, reject) => {
      if (testData[id]) {
        const updatedUser = {
          id: id !== undefined ? id : testData[id].id,
          firstName: firstName !== undefined ? firstName : testData[id].firstName,
          age: age !== undefined ? age : testData[id].age
        }
        testData[id] = updatedUser
        resolve([id])
      } else {
        reject('user does not exist')
      }
    })
  },
  delete: ({ id }) => {
    return new Promise((resolve, reject) => {
      if (testData[id]) {
        delete testData[id]
        resolve(id)
      } else {
        reject('user does not exist')
      }
    });

  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      resolve(testData)
    });
  },
  findById: ({ id }) => {
    return new Promise((resolve, reject) => {
      if (testData[id-1] !== undefined) {
        resolve(testData[id-1])
      } else {
        reject('user does not exist')
      }
    });
  },
}