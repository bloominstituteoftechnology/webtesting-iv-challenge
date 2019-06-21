const server = require('./server')
const supertest = require('supertest')
const db = require('../data/dbConfig')
const { add, remove } = require('../lol/characterModel')

describe('server', () => {
    describe('Get /', () => {
        it('responds with 200 OK', () => {
            supertest(server)
                .get('/')
                .expect(200)
        })

        it('responds with 200 ok', async () => {
            await supertest(server)
                .get('/')
                .expect('Content-Type', /json/i)
        })

        it('responds with correct status', done => {
            supertest(server)
                .get('/')
                .expect(200, done)
        })

        it('responds { api: up and running }', async () => {
            await supertest(server)
                .get('/')
                .then(res => {
                    expect(res.body).toEqual({ api: "up and running" })
                })
        })
    })
    describe('characters model', () => {
        beforeEach(async () => {
            await db('characters').truncate()
        })

        describe('add()', () => {
            it('should add character', async () => {
                await add({ name: 'Darius' });
                await add({ name: 'Draven' });

                const character = await db('characters');

                expect(character).toHaveLength(2);
            });

            it('should add the provided characters', async () => {
                let character = { name: 'Riven' };
                let add = await add(character);
                expect(add.name).toBe(character.name);

                character = { name: 'Oriana' };
                add = await add(character);
                expect(add.name).toBe(character.name);
            });
        });

        describe('delete()', () => {
            it('should delete character', async () => {
                await remove({ name: 'Darius' });
                await remove({ name: 'Draven' });

                const character = await db('characters');

                expect(character).toHaveLength(0);
            });
        })
    })
})

