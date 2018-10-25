const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {
    describe('GET /', () => {

      it('should return status code 200(OK)', async () => {
        const response = await request(server).get('/');

        expect(response.status).toBe(200);
      });

      it('should return JSON', async () => {
        const response = await request(server).get('/');

        expect(response.type).toBe('application/json');
      });

      it('should return { message: "server up" }', async () => {
        const response = await request(server).get('/');

        expect(response.body).toEqual({ message: "server is up" });
      })
    });

    describe('POST /api/students', () => {
        it('should greet the person', async () => {
            const name = 'Austin';
            
            
            const response = await request(server)
            .post(`/api/students`)
            .send({ name });

            expect(response.body).toBeTruthy();
        })

        it('should return error if no name', async () => {
            const name = null;
            const response = await request(server)
            .post(`/api/students`)
            .send({ name });
            expect(response.status).toBe(500);
        })

        it('should return status code 201 if ok', async () => {
            const name = "Fred";
            const response = await request(server)
            .post(`/api/students`)
            .send({ name });
            expect(response.status).toBe(201);
        })
    });

    describe('DELETE /api/students/:id', () => {
        it('should delete the person', async () => {
            const id = 5;
            
            
            const response = await request(server)
            .delete(`/api/students/${id}`)
            .send({ id });

            expect(response.status).toEqual(200);
        })

        it('should return 404 if no user at id', async () => {
            const id = 2;
            
            
            const response = await request(server)
            .delete(`/api/students/${id}`)
            .send({ id });

            expect(response.status).toEqual(404);
        })

        it('should return { message: No records found to update }', async () => {
            const id = 2;
            
            
            const response = await request(server)
            .delete(`/api/students/${id}`)
            .send({ id });

            expect(response.body).toEqual({ message: 'No records found to delete' });
        })
    })
    it('can run tests', () => {
        expect(true).toBeTruthy();
    });

    it('can run more tests', () => {
        expect(false).toBeFalsy();
    });
})