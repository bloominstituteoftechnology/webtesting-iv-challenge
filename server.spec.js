const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    it('we runnning the tests!!', () => {
        expect(true).toBeTruthy();
    })

    describe('GET /', () => {
      it('200 status code (OK)??', async () => {
          const response = await request(server).get('/');

          expect(response.status).toBe(200);
      });
  });

  describe('POST /celeb', () => {
        it('should add a celebrity to celeb', async () => {
            let celebrity = 'Chris Brown';
            let profession = 'Singer';
            let response = await request(server)
                .post(`/celeb`)
                .send({ celebrity, profession })
                // .send({ name: 'Chris Brown', profession: 'Singer' });
            expect(response.body).toEqual({ id: 1, name: 'Chris Brown', profession: 'Singer' });
        });

        it('should return JSON', async () => {
            let celebrity = 'Chris Brown';
            let profession = 'Singer';
            const response = await request(server)
                .post('/celeb')
                .send({ celebrity, profession })
            expect(response.type).toEqual('application/json');
        });
    });

    describe('DELETE /celeb:id', () => {
      it('200 status code (OK)??', async () => {
          const response = await request(server).delete('/celeb/1');

          expect(response.status).toBe(200);
      });

      it('should return the id of the deleted celebrity', async () => {
          const response = await request(server)
              .delete('/celeb/1')
              .send({ id: '1' });

          expect(response.body).toEqual({ id: '1' });
      });
  });
})