const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Note = require('./Note');

describe('/notes', () => {

    // POST notes
    describe('POST notes', () => {
        it('checks if note is created properly', async () => {
            // arrange
            const noteBody = { title: 'Chores', body: 'Pick up milk', password: 'dabadoo'}

            // act
            const newNote = await Note.create(noteBody);

            // assert
            expect(newNote.title).toEqual('Chores');

        })
    })

    // DELETE notes
    describe('DELETE notes', () => {

    })
})