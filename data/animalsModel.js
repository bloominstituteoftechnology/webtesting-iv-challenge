module.exports = {
  insert,
  // update,
  remove,
  // getAll,
  // findById
};

function insert(db, animal) {
  db.push(animal);
  return db.length;
}

function remove(db, id) {
    for (let i = 0; i < db.length; i++) {
        if (db[i].id === id) {
            db.splice(i, 1);
            return 1;
        }
    }
}