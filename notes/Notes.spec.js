// // import { userInfo } from 'os';
// // import { mongo } from 'mongoose';

// const mongoose = require('mongoose');
// const request = require('supertest');

// const server = require('../server');
// const Notes = require('./Notes');
// const bcrypt = require('bcrypt');

// describe('Notes model', () => {
//     beforeAll(() => {
//         return mongoose
//         .connect('mongodb://localhost/notesdb')
//         .then(console.log('Connected to the mongoose database'))
//     })
//     beforeEach(() => {
//         return Notes.remove();
//     })
//     afterEach(() => {

//     })
//     afterAll(() => {
//         return mongo.disconnect();
//     });
//     it('Should hash the password before saving the user', async() => {
//         const user = {username: 'abraham', password: 'pass'};
//         const savedNotes = await Notes.create(user);

//         expect(savedNotes.password).not.toEqual(user.password);
//     })
// });

// describe('POST /notes', () => {
//     it('Responds with json', async() => {
//         request
//     })
// })
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Note = require('./Notes');

describe('/notes', () => {

    // // POST notes
    describe('POST notes', () => {
        beforeAll(() => {
            mongoose
            .connect(`mongodb://localhost/notesdb`)
            .then(connected => {
                console.log('Connected')
            })
            .catch(err => {
                console.log('Not Connected')
            })
        })

        beforeEach(() => {
            // return User.remove();
          });
        
          afterEach(() => {
            // return Note.remove();
          });
        
          afterAll(() => {
            return mongoose.disconnect();
          });

        it('checks if note is created properly', async () => {
            // arrange
            const noteBody = { username: 'Uname1', title: 'Test successfull', password: 'pass'}
            const newTitle = noteBody.title;
            // act
            const newNote = await Note.create(noteBody);

            // assert
            console.log('New note',newNote);
            console.log('noteBody', noteBody);

            expect(newNote.title).toBe(newTitle);
            expect(newNote.password).not.toEqual(noteBody.password);
            expect(typeof newNote.checkPassword).toBe('function')
        })


    })

// DELETE notes
describe('DELETE notes', () => {
    beforeAll(() => {
        mongoose
        .connect(`mongodb://localhost/notesdb`)
        .then(connected => {
            console.log('Connected')
        })
        .catch(err => {
            console.log('Not Connected')
        })
    })
    beforeEach(() => {
        // return User.remove();
      });
    
      afterEach(() => {
        // return Note.remove();
      });
    
      afterAll(() => {
        return mongoose.disconnect();
      });
    // afterAll(() => {
    //     mongoose.disconnect()
    // })
    
    it('checks if note is deleted', async () => {
        
        // arrange
        const id = { _id: "5b07addac4a89c42f5f9eb30"}
        
        const notes = Note.findById(id);

        // act
        const note = await Note.findByIdAndRemove(id);
        
        // assert
        expect(await notes).toBeNull()
    })
})

})