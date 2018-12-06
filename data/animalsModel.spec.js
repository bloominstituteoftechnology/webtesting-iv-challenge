let db = require("./animalsDB");
const { insert, remove } = require("./animalsModel")

beforeEach(() => {
    db = []
  });

describe('animals db', () => {
    it('should add the animal to the database', () => {
        expect(db).toHaveLength(0);
    //   let response = await request(server)
    //     .post('/animal')
    //     .send({ id: 1, name: "Bear" });
        insert(db, { id: 1, name: "Bear" });
        expect(db).toHaveLength(1);

    //   response = await request(server)
    //     .post('/animal')
    //     .send({ id: 2, name: "Giraffe" });
        insert(db, { id: 2, name: "Giraffe" });
        expect(db).toHaveLength(2);
    });

    it('should delete the animal from the database', () => {
        expect(db).toHaveLength(0);
        insert(db, { id: 1, name: "Bear" });
        expect(db).toHaveLength(1);

        remove(db, 1);
        expect(db).toHaveLength(0);

        insert(db, { id: 1, name: "Bear" });
        insert(db, { id: 2, name: "Giraffe" });
        remove(db, 1);
        expect(db).toHaveLength(1);
    });
});