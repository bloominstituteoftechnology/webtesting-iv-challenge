//when making a GET to the / endpoint the APT should respond with status code 200 and the following JSON object 
//`{ api: running }`
const request = require('supertest');
const server = require('./server.js'); //this is our first red....it doesn't exist...so now we have to create the file.
const mongoose = require('mongoose');
const Char = require('./characters/Character');

const routeTest = request(server);

describe('server.js', ()=> {
    const ron = {charName: "Ronald Weasley", birthday: "1 March 1980", wand: "Willow and unicorn tail, fourteen inch", house: "Gryffindor"};
    const hermione = {charName: "Hermione Grainger", birthday: "19 Sepetember 1979", wand: "Dragon heartrsting core, ten and three-quarter inches, vine wood", house: "Gryffindor"}
    const harry = {charName: "Harry Potter", birthday: "31 July 1980", wand: "Holly and Phoenix feather, eleven inches", house: "Gryffindor"};
    const minerva = { charName: "Minerva McGonagall", birthday: "4 October", wand: "Fir and dragon heartstring, nine and a half inches", house: "Gryffindor"};
    
    
    beforeAll(() => {
        return mongoose.connect("mongodb://localhost/testDb")
    });

    afterEach(() => {
        return Char.remove();
    })

    afterAll(()=>{
        return mongoose.disconnect();
    })

    it('should return OK and JSON object from index route', async ()=> {
        const expectedStatus = 200;
        const expectedBody = { api: 'api running...' };
        //do a get request to API using supertest
        const response = await routeTest.get("/");
            expect(response.status).toEqual(expectedStatus);
            expect(response.body).toEqual(expectedBody);
            expect(response.type).toEqual("application/json");

    })

    it('should return OK and JSON obj take 2 using bros', () => {
        const expectedStatus = 200;
        const expectedBody = { api: 'api running...' };
        let response;
        return routeTest.get('/').then(res => {
            response = res;
            expect(response.status).toEqual(expectedStatus);
            expect(response.body).toEqual(expectedBody);
            expect(response.type).toEqual("application/json");
        });
    });
   
    })

    

