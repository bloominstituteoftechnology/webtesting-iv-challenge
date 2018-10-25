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
        expect(Object.keys(response.body[randomIndex()])).toEqual(['id','name','pokemon'])
        expect(Object.keys(response.body[randomIndex()])).toEqual(['id','name','pokemon'])
        expect(Object.keys(response.body[randomIndex()])).toEqual(['id','name','pokemon'])
    })
})

// --- Create Trainer ---
describe('POST: /api/addTrainer', () => {
    it('Should respond with JSON', async () => {
        const response = await request(server).post('/api/addTrainer').send({ name: "Misty", pokemon: "Psyduck" });
        expect(response.type).toBe('application/json');
    })

    // Failure Tests
    it('Should respond with a status code of 400 if not sent a name or a pokemon', async () => {
        const missingName = await request(server).post('/api/addTrainer').send({ pokemon: "Geodude" });
        const missingPokemon = await request(server).post('/api/addTrainer').send({ name: "Brock" });
        const missingBoth = await request(server).post('/api/addTrainer').send();

        expect(missingName.status).toBe(400);
        expect(missingPokemon.status).toBe(400);
        expect(missingBoth.status).toBe(400);
    })

    it('Should respond with an error message if not sent a name or a pokemon', async () => {
        const errorMessage = {errorMessage: "You must provide a name and a pokemon."};

        const missingName = await request(server).post('/api/addTrainer').send({ pokemon: "Geodude" });
        const missingPokemon = await request(server).post('/api/addTrainer').send({ name: "Brock" });
        const missingBoth =await request(server).post('/api/addTrainer').send();

        expect(missingName.body).toEqual(errorMessage);
        expect(missingPokemon.body).toEqual(errorMessage);
        expect(missingBoth.body).toEqual(errorMessage);
    })

    // Success Tests
    it('Should respond with a status code of 200 after a successful creation', async () => {
        const response = await request(server).post('/api/addTrainer').send({ name: "Brock", pokemon: "Geodude" });
        expect(response.status).toBe(201)
    })

    it('Should respond with the newly created trainer after a successful creation', async () => {
        const trainer = { name: "Brockstar", pokemon: "Nidorino" };
        const response = await request(server).post('/api/addTrainer').send(trainer);
        expect({name: response.body.name, pokemon: response.body.pokemon }).toEqual(trainer)
    })

    it('Should have increased the number of trainers by one after a successful creation', async () => {{
        const trainer = { name: "Emi", pokemon: "Gardevoir" };
        const initialGetResponse = await request(server).get('/api/trainers');
        await request(server).post('/api/addTrainer').send(trainer);
        const finalGetResponse = await request(server).get('/api/trainers');
        expect(finalGetResponse.body.length).toBe(initialGetResponse.body.length + 1);
    }})
})

// --- DELETE Trainer ---

describe('DELETE: /api/deleteTrainer/:id', () => {
    // Create Three Trainers for Use in the DELETE Trainer Tests, and create failing delete test
    beforeAll( async () => {
        await request(server).post('/api/addTrainer').send({ name: "Bug Catcher", pokemon: "Weedle" });
        await request(server).post('/api/addTrainer').send({ name: "Shorts Trainer", pokemon: "Caterpie" });
        await request(server).post('/api/addTrainer').send({ name: "Cool Trainer", pokemon: "Pidgeotto" });

        // Failing Delete Request
        return failResponse = await request(server).delete('/api/deleteTrainer/notRealId');
    })

    it('Should respond with JSON', async () => {
        const response = await request(server).delete('/api/deleteTrainer/0');
        expect(response.type).toBe('application/json');
    })

    // Failure Tests
    it('Should respond with a status code of 404 if the deletion fails', async () => {
        expect(failResponse.status).toBe(404);
    })

    it('Should respond with an errorMessage if the deletion fails', async () => {
        const errorMessage = {errorMessage: "We were unable to delete the trainer with the provided id."}
        expect(failResponse.body).toEqual(errorMessage);
    })

    // Success Tests
    it('Should respond with a status code of 204 if the deletion is successful', async () => {
        const trainerId = 1;
        const response = await request(server).delete(`/api/deleteTrainer/${trainerId}`);
        expect(response.status).toBe(204);
    })

    it('Should respond with the id of the deleted trainer if the deletion is successful', async () => {
        const trainerId = 2;
        const response = await request(server).delete(`/api/deleteTrainer/${trainerId}`);
        expect(response.body).toBe({trainerId});
    })

    it('Should have decreased the number of trainers by one after a successful deletion', async () => {
        const trainerId = 3;
        const initialGetResponse = await request(server).get('/api/trainers');
        await request(server).delete(`/api/deleteTrainer/${trainerId}`);
        const finalGetResponse = await request(server).get('/api/trainers');
        expect(finalGetResponse.body.length).toBe(initialGetResponse.body.length - 1);
    })

})