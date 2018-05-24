const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Note = require('./Note');

describe('/notes', () => {

    // // POST notes
    describe('POST notes', () => {
        beforeAll(() => {
            mongoose
            .connect(`mongodb://localhost/testnotedb`)
            .then(connected => {
                console.log('Connected')
            })
            .catch(err => {
                console.log('Not Connected')
            })
        })

        afterAll(() => {
            mongoose.disconnected()
        })

        it('checks if note is created properly', async () => {
            // arrange
            const noteBody = { title: 'Choresz', body: 'Pick up milk', password: 'dabadoo'}

            // act
            const newNote = await Note.create(noteBody);

            // assert
            expect(newNote.title).toEqual('Choresz');

        })

        it('checks if password is properly hashed', async () => {
            // arrange
            const noteBody = { title: 'Chores', body: 'Pick up milk', password: 'dabadoo'}

            // act
            const newNote = await Note.create(noteBody);

            // assert
            expect(newNote.password).not.toEqual(noteBody.password);

        })
    })

    // DELETE notes
    describe('DELETE notes', () => {
        beforeAll(() => {
            mongoose
            .connect(`mongodb://localhost/testnotedb`)
            .then(connected => {
                console.log('Connected')
            })
            .catch(err => {
                console.log('Not Connected')
            })
        })

        it('checks if id being passed in is an object', async () => {

            // arrange
            const id = { _id: "5b072a80f10812f8b16a5edf" }
           
            // assert
            expect(typeof id).toBe('object')
        })

        it('checks if note is deleted', async () => {

            // arrange
            // const id = { _id: "5b072aa2bcb8aef8bdd7c688" }
            const title = { title: 'Choresz'}

            // act
            const note = await Note.findOneAndRemove(title);
            
            // assert
            expect(title).not.toEqual(note.title)
        })
    })

})