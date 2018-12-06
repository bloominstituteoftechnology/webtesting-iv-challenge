const request = require('supertest');
let server = require('./api/server.js');
let db = require("./animalsModel");

beforeEach(() => {
    db = []
  });

describe('POST /animal endpoint', () => {
    it('should add the animal to the database', async () => {
      let response = await request(server)
        .post('/animal')
        .send({ id: 1, name: "Bear" });

      expect(db).toHaveLength(1);

      response = await request(server)
        .post('/animal')
        .send({ id: 2, name: "Giraffe" });

        expect(db).toHaveLength(1);
    });
});