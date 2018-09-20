const server = require('./server.js');
const request = require('supertest'); 

describe ('server.js', () =>{
    it('runs the test', () => {
        expect(true).toBeTruthy(); 
    }); 
    describe("GET /", () => {
        it('returns a 200 (OK) status code', async ()=> {
            const response = await request(server).get('/'); 
            expect(response.status).toEqual(200); 
        }); 
        it('should return {api: "running"} ', async () => {
            const expectedBody = {api: 'running'}; 
            const response = await request(server).get('/'); 
            expect(response.body).toEqual(expectedBody);   
        }); 
        it('should return JSON ', async () => {
            const response = await request(server).get('/hello'); 
            expect(response.type).toEqual('application/json');   
        })
    })
    describe("/movies/:title", () => {
        it("should return a greeting", async () => {
            const response = await request(server)
            .post('/movies/hereditary')
            .send({genre: "horror"}); 
            expect(response.body).toEqual({movie:"hereditary horror"}); 
        })
    })
});