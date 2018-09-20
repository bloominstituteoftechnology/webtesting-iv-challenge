const request = require('supertest');
const server = require('./server.js'); 

describe('BASIC SERVER IS RUNNING TEST', () => {
    it('runs the tests', () => {
        expect(true).toBeTruthy();
    })

})

describe('GET', () => {
    it('should return a status code of 200 after getting users', async () => {
        const response = await request(server).get('/users');
            
        expect(response.status).toEqual(200); 
    })
})

describe('POST', () => {
    it.skip('should post a user to the table "users"', async () => {
        const response = await request(server)
            .post('/users')
            .send({
                username: 'Queen Qbert',
                department: 'fruit loops',
            })
            
        expect(response.body).toEqual({added: 'Queen Qbert has been added!'}); 
    })

    it.skip('should return a status code of 200 after posting a user', async () => {
        const response = await request(server)
            .post('/users')
            .send({
                username: 'Kangaroo Qbert',
                department: 'fruit loops',
            }) 
        expect(response.status).toEqual(200); 
    })

    it('should return a status code of 500 if posting a user fails', async () => {
        const response = await request(server)
            .post('/users')
            .send({
                username: 'Kangaroo Qbert',
                department: 'fruit loops',
            }) 
        expect(response.status).toEqual(500); 
    })
})

describe('DELETE', () => { 
    it.skip('should delete a user from the table "users"', async () => {
        const id = 6;

        const response = await request(server)
            .delete(`/users/${id}`)
            
        expect(response.body).toEqual({deleted: `User with ID of ${id} has been deleted!`}); 
    })

    it.skip('should return a status code of 200 after deleting a user', async () => {
        const id = 4;

        const response = await request(server)
            .delete(`/users/${id}`)

        expect(response.status).toEqual(200); 
    })

})