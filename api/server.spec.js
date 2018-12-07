const request = require('supertest')
const server = require('./server')

const db = require('./jsonDBLayer')
const testData = require('./testData')
describe('Server endpoints', () => {

  describe('/ route', () => {

    it('/ should return status code 200', async () => {
      const response = await request(server).get('/')

      expect(response.status).toBe(200);
    });

    it('/ should return a message', async () => {
      const response = await request(server).get('/')

      expect(response.body).toEqual({ message: 'up!' });

    });

    describe('/api route', () => {
      const url = '/api'

      it(`should return status code 200 for ${url}`, async () => {
        const response = await request(server).get(url)

        expect(response.status).toBe(200);
        const expected = { message: 'this is the users endpoint' }
        expect(response.body).toEqual(expected);
      });


      describe('/api/users route', () => {
        // base url for this set of endpoints
        const url = '/api/users'

        it('should return all users', async () => {
          const response = await request(server).get(url)

          expect(response.body).toEqual(testData);
        })

        it('should return status code 500 for non-existent users', async () => {
          const response = await request(server).get(url + '/51')

          expect(response.status).toBe(500)
        });

        it('should return 200 for getting users that exist', async () => {
          const response = await request(server).get(url + '/1')
          const expected = {"age": 39, "firstName": "Yancey", "id": 1}; 
          expect(response.body).toEqual(expected);
        });

        const userObj = {
          name: 'bob',
          age: '35'
        }

        it('should return status code 201 for adding a user', async () => {
          const response = await request(server)
            .post(url)
            .send(userObj)

          expect(response.status).toBe(201);
          expect(response.body).toEqual([ 51 ]);
        });

        it('should return 200 for new user', async () => {
          const response = await request(server).get(url + '/51')

          expect(response.body).toEqual({ id: 51, });
        });

        userObj.age = 36;
        it('should return status code 200 for updating a user', async () => {
          const response = await request(server)
            .put(url + '/51')
            .send(userObj)

          expect(response.status).toBe(200);
          expect(response.body).toEqual([ 1 ]);

        });

        it('user in db should match updated user', async () => {
          const response = await request(server)
            .get(url + '/51')
          
          const expected = {
            id: 51,
            name: 'bob',
            age: 36
          }

          expect(response.body).toEqual(expected);
        });

        it('should return status code 200 upon successfully deleting a user', async () => {
          const response = await request(server)
            .delete(url + '/51')
          
          expect(response.status).toBe(200);
        });

        it('user should no longer exist', async () => {
          const response = await request(server)
            .get(url + '/51')
          
          expect(response.status).toBe(500);
        });

        it('trying to delete a non-existent user', async () => {
          const response = await request(server)
            .delete(url + '/51')
          
          expect(response.status).toBe(500);
        })
      });
    });
  });
});