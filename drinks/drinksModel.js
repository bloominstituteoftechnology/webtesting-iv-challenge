const db=require('../data/dbConfig');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
  };

  async function insert(drink) {
    return null;
  }
  
  async function update(id, changes) {
    return null;
  }
  
  function remove(id) {
    return null;
  }
  
  function getAll() {
    return db('drinks');
  }
  
  function findById(id) {
    return null;
  }