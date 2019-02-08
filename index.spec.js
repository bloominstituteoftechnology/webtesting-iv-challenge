//import server
const server = require('./api/server.js')

//import supertest library for requesting to server
const request = require('supertest');

//import data file
const filename = './data/cars.json'
const carsData = require(filename);

//GET Tests
describe('GET /cars', ()=>{
  it('should return status code 200', async ()=>{
    const response = await request(server).get('/cars');

    expect(response.status).toBe(200);
  })

  it('should return type JSON', async ()=>{
    const response = await request(server).get('/cars')

    expect(response.type).toBe('application/json')
  })

  it('should return object containing all cars', async ()=>{
    const response = await request(server).get('/cars');
    const expected = [
      {
        "id": "0",
        "make": "porshe", 
        "model": "911 carerra",
        "year": "2013"
      },
      {
        "id": "1",
        "make": "chevrolet", 
        "model": "corvette",
        "year": "2017"
      }
    ]

    expect(response.body.carsData).toEqual(expected);
  })
})

//POST Tests
describe('POST /cars', ()=>{
  it('should return the name of the newly created car', async ()=>{
    const response = await request(server).post('/cars')
          .send(  {
            "id": "2",
            "make": "Hyundai", 
            "model": "Elantra",
            "year": "2012"
          });
    const expected = {name: "Hyundai Elantra"};
    expect(response.body).toEqual(expected);
  });

  it('should return status code of 201', async ()=>{
    const response = await request(server).post('/cars')
    .send(  {
      "id": "3",
      "make": "Subaru", 
      "model": "Forester",
      "year": "2015"
    });

    expect(response.status).toBe(201);
  })

})

//DELETE Tests
describe('DELETE /cars/:id', ()=>{
  it('should returns status code 200', async ()=>{
    const id = 3;
    const response = await request(server).delete(`/cars/${id}`);
    expect(response.status).toBe(200);
  })

  it('should return the id of the car deleted', async ()=>{
    const id = 3;
    const response = await request(server).delete(`/cars/${id}`);
    const expected = {"id": "3"};

    expect(response.body).toEqual(expected);
  })
})


