const server = require("../server.js");
const request = require("supertest");
const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.test)
const dbModel = require('../user/testUserDataModel')

describe("server", () => {
    beforeEach(() => {
//return db.migrate.latest()
        //.then(() => {
            return db.seed.run()
       // })
     });
     afterEach(() => {
         //return db.migrate.rollback()
     });
     
  describe("GET /", () => {
    it("should return status code: 200", async () => {
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
    });
    it("should return a json object", async () => {
      const response = await request(server).get("/");
      expect(response.type).toBe("application/json");
    });
    it('should return {message:"server reached"}', async () => {
      const response = await request(server).get("/");
      expect(response.body).toEqual({ message: "server reached" });
    });
  });
  describe("GET /usernames", () => {
    
    it("should return array of usernames", async () => {
      const response = await request(server).get("/usernames");
      expect(response.body.usernames).toEqual(["Joe", "Jim", "Carl"]);
    });
  });
  describe('DELETE /:id', () => {
       it('should return status code 301', async () => {
           const response = await request(server).delete('/1')
           expect(response.status).toBe(301)
       }); 

      it('should return 1', async () => {
          const response = await request(server).delete("/1")
          expect(response.body).toBe(1)
      });
      it('should return ["Carl", "Jim"]', async () => {
          await request(server).delete("/1")
          const usernames = []
          const response = await dbModel.findUsernames()  
          response.forEach(user => usernames.push(user.username))
          expect(usernames).toEqual(["Carl", "Jim"])  
      });
  });
  describe('POST /', () => {
      const dummyData = {username: "Alex", password: "password"}
    it('should be added to database', async () => {
        const usernames = []
        
        const response = await request(server).post("/").send({username: "Alex", password: "password"})
        expect(response.body).toBe(1)
    });
    it('should have a status code of 201', async () => {
        const response = await request(server).post('/').send(dummyData)
        expect(response.status).toBe(201)
    });
    it('should have a json type', async () => {
        const response = await request(server).post('/').send(dummyData)
        expect(response.type).toBe('application/json')
    });
  })
  
});
