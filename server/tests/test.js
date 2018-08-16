const request = require('supertest');

const server = require('../index.js');

describe('index.js', () => {
  describe('root', () => {
    it('should return status code 200', async () => {
      const response = await request(server).get('/');

      expect(response.status).toEqual(200);
    });

    it('should return type JSON', async () => {
      const response = await request(server).get('/');

      expect(response.type).toEqual('application/json');
    });

    it('should return accurate JSON', async () => {
      const expected = {
        success: true,
        data: {
          api: 'running',
        },
      };
      const response = await request(server).get('/');

      expect(response.body).toEqual(expected);
    });
  });
});

describe('POST /instrument', () => {
  it('returns instrument: instrumentName when invoked', async () => {
    // arrange
    const expected = { instrument: 'Cello' };

    // act
    const response = await request(server)
      .post('/instrument')
      .send({ instrument: 'Cello' });

    // assert
    expect(response.body).toEqual(expected);
  });
});

describe('delete /instrument', () => {
//   it ('deletes something', async () => {
//     const response = await request(server)
//       .delete('/instrument')
//       .send('Cello');
//       expect(response.body).toEqual({"deleted": "Cello"});
//   })
  it('has something to delete', async () => {
    const myReq = request(server);
    const response = await request(server)
      .delete('/instrument')
      .send({"Hello": "World"})
    expect(response).toEqual({"Hello": "World"});
  })
})
