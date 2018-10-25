const server = require('./api/server');
const request = require('supertest');

// ----- Endpoint Tests -----
// --- Test Endpoint ---
describe('Testing Endpoint GET: /1234/test', () => {
    beforeAll( async () => {
        return response = await request(server).get('/1234/test');
    });

    it('Should respond with JSON', () => {
        expect(response.type).toBe('application/json');
    });

    it('Should respond with a status code of: 200', () => {
        expect(response.status).toBe(200);
    });

    it('Should respond with a message: "DO NOT TEST ME BRO!"', () => {
        expect(response.body).toBe('DO NOT TEST ME BRO!');
    });
});

// --- Get Trainers ---
describe('GET: /api/trainers', () => {
    beforeAll( async () => {
        return response = await request(server).get('/api/trainers');
    })

    it('Should respond with JSON', () => { 
        expect(response.type).toBe('application/json');
    })

    it('Should respond with a status code of: 200', () => {
        expect(response.status).toBe(200);
    });

    it('Should respond with an array of objects with a name and a pokemon property', () => {
        const randomIndex = () => {
            return Math.floor(Math.random() * response.body.length)
        } 

        expect(Array.isArray(response.body)).toBeTruthy;
        
        // Check the type of three random items in the response array
        expect(typeof response.body[randomIndex()]).toBe('object');
        expect(typeof response.body[randomIndex()]).toBe('object');
        expect(typeof response.body[randomIndex()]).toBe('object');

        // Check the properties of three random items in the response array
        expect(Object.keys(response.body[randomIndex()])).toEqual(['name','pokemon'])
        expect(Object.keys(response.body[randomIndex()])).toEqual(['name','pokemon'])
        expect(Object.keys(response.body[randomIndex()])).toEqual(['name','pokemon'])
    })
})

// --- Create Trainer ---
describe('POST: /api/addTrainer', () => {
    it('Should respond with JSON', async () => {
        const response = await request(server).post('/api/addTrainer').send({ name: "Misty", pokemon: "Psyduck" });
        expect(response.type).toBe('application/json');
    })

    it('Should respond with a status code of 200', async () => {
        const response = await request(server).post('/api/addTrainer').send({ name: "Brock", pokemon: "Geodude" });
        expect(response.status).toBe('200')
    })

    it('Should respond with a status code of 400 if not sent a name or a pokemon', async () => {
        const missingName = await request(server).post('/api/addTrainer').send({ pokemon: "Geodude" });
        const missingPokemon = await request(server).post('/api/addTrainer').send({ name: "Brock" });
        const missingBoth = await request(server).post('/api/addTrainer').send();

        expect(missingName.status).toBe('400');
        expect(missingPokemon.status).toBe('400');
        expect(missingBoth.status).toBe('400');
    })

    it('Should respond with an error message if not sent a name or a pokemon', async () => {
        const errorMessage = {errorMessage: "You must provide a name and a pokemon."};

        const missingName = await request(server).post('/api/addTrainer').send({ pokemon: "Geodude" });
        const missingPokemon = await request(server).post('/api/addTrainer').send({ name: "Brock" });
        const missingBoth =await request(server).post('/api/addTrainer').send();

        expect(missingName.body).toBe(errorMessage);
        expect(missingPokemon.body).toBe(errorMessage);
        expect(missingBoth.body).toBe(errorMessage);
    })

    it('Should respond with the newly created trainer after a successfull creation', async () => {
        const trainer = { name: "Brockstar", pokemon: "Nidorino" };
        const response = await request(server).post('/api/addTrainer').send(trainer);
        expect(response.body).toEqual(trainer)
    })
})
