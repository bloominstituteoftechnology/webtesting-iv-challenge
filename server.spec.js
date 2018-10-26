const request = require('supertest');
const server = require('./server.js');

describe('server.js', ()=> {
    describe('/', ()=> {
        it('should return a 200 status code', ()=> {
            let response;
            const expectedCode = 200;
            return request(server).get('/').then(res=> {
                response = res;
                expect(response.status).toEqual(expectedCode);
            })
        });

        it('should return a JSON object fron the index route', async () => {
            const expectedBody = { message: "Hi :)" };
      
            const response = await request(server).get('/');
      
            expect(response.body).toEqual(expectedBody);
        });

    });

    describe('POST /dinner/:entree', () => {
        it('should tell you what dinner is today', async () => {
          const entree = 'Spaghetti';
          const side = 'Garlic Bread';
          const expected = { dinner: 'Spaghetti and Garlic Bread' };
    
          const response = await request(server)
            .post(`/dinner/${entree}`)
            .send({ side });
    
          expect(response.body).toEqual(expected);
        });
    
        it('should default to salad if no side provided', async () => {
          const entree = 'Spaghetti';
          const expected = { dinner: 'Spaghetti and green salad' };
    
          const response = await request(server).post(`/dinner/:entree`);
    
          expect(response.body).toEqual(expected);
        });

      });

    describe('/DELETE /dinner/:entree', ()=> {
      it('should delete dinner', async ()=> {
        const entree = 'Steak';
        const expected = {message: "Dinner is canceled"};
        const response = await request(server)
            .del(`/dinner/${entree}`);
        expect(response.body).toEqual(expected);
      });
    });
});