// const db = require('../data/dbConfig')
// const { add } = require('./characterModel')

// describe('characters model', () => {
//     beforeEach(async () => {
//         await db('characters').truncate()
//     })

//     describe('add()', () => {
//         it('should add character', async () => {
//           await add({ name: 'Darius' });
//           await add({ name: 'Draven' });
    
//           const character = await db('characters');
    
//           expect(character).toHaveLength(5);
//         });
    
//         it('should add the provided characters', async () => {
//           let character = { name: 'Riven' };
//           let add = await add(character);
//           expect(add.name).toBe(character.name);
    
//           character = { name: 'Oriana' };
//           add = await add(character);
//           expect(add.name).toBe(character.name);
//         });
//       });

//       describe('delete()', () => {
//         it('should add character', async () => {
//           await remove({ name: 'Darius' });
//           await remove({ name: 'Draven' });
    
//           const character = await db('characters');
    
//           expect(character).toHaveLength(3);
//         });
//       })
// })