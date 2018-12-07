const request = require('supertest');

const server = require('../api/server.js');

describe('server.js', () => {
  // http calls made with supertest return promises, we can use async/await if desired
  describe('/ route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/')
      expect(response.status).toBe(200);
    })
  })

  it('should return JSON', async () => {
    let response = await request(server).get('/')
    expect(response.type).toBe('application/json');
    // expect(response.type).toBe('application/xml'); // RED TEST 
    // why application ?
  })

  it('should return should return a JSON object from the index route', async () => {
    const expectedBody = { api: 'up' };
    // const redTestExpectedBody = { api: 'running' } // RED TEST
    const response = await request(server).get('/')
    expect(response.body).toEqual(expectedBody);
    // expect(response.body).toEqual(redTestExpectedBody); // RED TEST
  })
})

describe('POST /addTheme endpoint', () => {
  it('should add a color to the theme', async () => {

    let response = await request(server)
    .post('/addTheme')
    .send({ color: 'LightSeaGreen' })
    
    expect(response.body).toEqual({ newColor: 'LightSeaGreen' });

    response = await request(server)
      .post('/addTheme')
      .send({ color: 'DarkOrange' });
    expect(response.body).toEqual({ newColor: 'DarkOrange' });
  })
})
