const request = require('supertest');
const server = require('../server.js'); //this is our first red....it doesn't exist...so now we have to create the file.
const mongoose = require('mongoose');
const Char = require('../characters/Character');

describe('Character Controller', () => {
    beforeAll(() => {
        return mongoose.connect("mongodb://localhost/testDb");
    })

    afterEach(() => {
        return Char.remove();
    })

    afterAll(() => {
        return mongoose.disconnect()
    })

    const ron = {charName: "Ronald Weasley", birthday: "1 March 1980", wand: "Willow and unicorn tail, fourteen inch", house: "Gryffindor"};

    it('should post a new char', async () => {
        const response = await request(server)
            .post("/api/chars/")
            .send(ron)

        expect(response.status).toEqual(201);
        expect(response.body.charName).toEqual('Ronald Weasley');
    });
});