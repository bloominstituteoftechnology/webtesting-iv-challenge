const request = require('supertest')
const server = require('./server.js');
describe('server.js', ()=> {

    it('GET / returns 200 status code', async ()=> {
        const response = await request(server).get("/");
        expect(response.status).toEqual(200)
    });

    it('server running', async ()=> {
        const expectedBody = {api: 'running'};
        const response = await request(server).get('/')
        expect(response.body).toEqual(expectedBody);
    });

    it('return json', async ()=> {
        const response = await request(server).get('/greet')
        expect(response.type).toEqual('application/json');
    });

    it('should greet', async ()=> {
        const name = "dog";
        const last = "go";
        const response = await request(server).post(`/greet/${name}`)
        .send({last: `${last}`})
        expect(response.body).toEqual({whatsup: `${name} ${last}`});
    })

    it('should delete', async ()=> {
        const name = "dog";
        const response = await request(server).delete(`/${name}`)
        .send(`${name}`)
        expect(response.body).toEqual(name);
    })
    
})