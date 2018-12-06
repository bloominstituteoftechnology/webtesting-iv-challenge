module.exports = {
  insert,
  remove,
};

function insert(db, animal) {
  db.push(animal);
}

function remove(db, id) {
    
    if (typeof id == "object") {
        id = id.id;
        for (let i = 0; i < db.length; i++) {
            if (db[i]["id"] == id) {
                db.splice(i, 1);
                i = 0;
            }
        }
    } else {
        for (let i = 0; i < db.length; i++) {
            if (db[i]["id"] == id) {
                db.splice(i, 1);
                i = 0;
            }
        }
    }
}