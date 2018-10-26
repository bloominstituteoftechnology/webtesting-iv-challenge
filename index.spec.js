const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {
  // test for GET ENDPOINT
  describe('GET /', () => {
    // check for correct http status code
    it('should return status code 200(OK)', async () => {
      const response = await request(server).get('/');

      expect(response.status).toBe(200);

    });

    // check for format of response
    it('should return JSON', async () => {
      const response = await request(server).get('/');

      expect(response.type).toBe('application/json');
    });

    // check for correct content inside response.body
    it('should return { message: "server is up" }', async () => {
      const response = await request(server).get('/');

      expect(response.body).toEqual({ message: 'server is working!' });
    });
  });

// Without db
  describe('POST /pets/:petsname', () => {
    // check for correct http status code
    it('should return status code 201', async () => {
      const response = await request(server).post('/pets/:petsname');

      expect(response.status).toBe(201);
    });

    // check for format of response
    it('should return JSON', async () => {
      const response = await request(server).post('/pets/:petsname');

      expect(response.type).toBe('application/json');
    });

    // check for adding content inside response.body
    it('should add a name of a pet', async () => {
      const petsname = 'Spot';
      const expected = { petsname: 'Spot' };

      const response = await request(server)
        .post(`/pets/${petsname}`);

      expect(response.body).toEqual(expected);
    });
  });

// Without db
  // test for DELETE ENDPOINT
  describe('DELETE /pets/:petsname', () => {
    it('should delete the pet specified', async () => {
      const petsname = 'Spot';
      const expected = { confirmed: `${petsname} has been deleted` };

      const response = await request(server)
        .delete(`/pets/${petsname}`);

        expect(response.body).toEqual(expected);
    });

    // check for correct http status code
    it('should return status code 200(OK)', async () => {
      const response = await request(server).delete('/pets/:petsname');

      expect(response.status).toBe(200);
    });

    // check for format of response
    it('should return JSON', async () => {
      const response = await request(server).delete('/pets/:petsname');

      expect(response.type).toBe('application/json');
    });
  });

// Without db
  // test for PUT ENDPOINT
  describe('PUT /pets/:petsname', () => {
    it ('should edit the petsname specified', async () => {
      const petsname = 'Spot';
      const expected = { updated: `${petsname} has been updated` };

      const response = await request(server)
        .put(`/pets/${petsname}`);

        expect(response.body).toEqual(expected);
    });
  });

// ==========FOR WITH DB TO PASS ALL TESTS==========
// ==============BEFORE RUNNING TESTS===============
// =====COMMENT OUT ONLY THE SPECIFIC ENDPOINT YOU ARE TESTING===========
// ============THEN SAVE AND RUN YARN TEST==========

// // With db
//   // test for GET ENDPOINT
//   describe('GET /pets', () => {
//     // check for correct http status code
//     it('should get list of all pets and return status code 200(OK)', async () => {
//       const response = await request(server).get('/pets');

//       expect(response.status).toBe(200);

//     });

//     // check for format of response
//     it('should return JSON', async () => {
//       const response = await request(server).get('/pets');

//       expect(response.type).toBe('application/json');
//     });
//   });

// // With db
//   // test for POST ENDPOINT
//   describe('POST /pets', () => {
//     // check for adding content inside the db
//     it('should add a name of a pet', async () => {
//       const response = await request(server)
//         .post(`/pets`)
//         .send({ petsName : 'petsName'});

//       const expected = { msg: 'name of pet has been added'};

//       expect(response.body).toEqual(expected);
//     });

//     // check for correct http status code
//     it('should return status code 201', async () => {
//       const response = await request(server)
//         .post('/pets')
//         .send({ petsName : 'petsName'});

//       expect(response.status).toBe(201);
//     });

//     // check for format of response
//     it('should return JSON', async () => {
//       const response = await request(server).post('/pets');

//       expect(response.type).toBe('application/json');
//     });
//   });

//  // With db 
//   // test for DELETE ENDPOINT
//   describe('DELETE /pets/:id', () => {
//     it('should delete the pet specified and return status code 200(OK)', async () => {
//       const response = await request(server)
//         .delete(`/pets/61`); // must provide id number of pet to delete

//         expect(response.body).toEqual({ msg: 'pet has been deleted' });

//         // check for correct http status code
//         expect(response.status).toBe(200);
//     });

//     // check for format of response
//     it('should return JSON', async () => {
//       const response = await request(server).delete('/pets/:id');

//       expect(response.type).toBe('application/json');
//     });
//   });

//  // With db 
//   // test for PUT ENDPOINT
//   describe('PUT /pets/:id', () => {
//     it ('should edit the petsname specified', async () => {
//       const response = await request(server)
//         .put(`/pets/58`) // must provide id number of petName to update
//         .send({ petsName : 'petName'}); // must provide petName

//         expect(response.body).toEqual({ msg: 'petsName has been updated' });
//     });
//   });

}); // DO NOT COMMENT THIS OUT