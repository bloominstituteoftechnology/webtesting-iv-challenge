const request = require("supertest");
const User = require('./Users/User')
const server = require('./server');

describe('server', () => {
    it('Should return OK and json object from index route', async() => {
        const expectedBody = {api: "running"};
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual(expectedBody);
    })

    it('Should hash passwords and return a json message', async() => {
        const userInfo = {
            username: "boop",
            password: "boop"
        }

        const user = new User(userInfo)



        const response = await request(server).post('/', (req, res) => {
            user.save().then(res.status(500))
        })
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
    })
})