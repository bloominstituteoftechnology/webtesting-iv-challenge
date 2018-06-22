const request = require("supertest");
const mongoose = require("mongoose");
const server = require("./server");

const User = require("./models/userModel");


let testToken;

describe("server.js", () => {
  beforeAll( async () => {
    mongoose.connect("mongodb://localhost/servertestdb");
    await User.remove()
  });
  afterAll( async () => {
    User.remove()
    await mongoose.disconnect();
  });
  
    it("should return OK and a JSON object from the index route", async () => {
      const expectedStatusCode = 200;
      const expectedBody = { greeting: "Speak friend and enter" };

      const response = await request(server).get("/");

      expect(response.status).toEqual(expectedStatusCode);
      expect(response.body).toEqual(expectedBody);
      expect(response.type).toEqual("application/json");
    });
    describe("posts to /register", () => {
    let user = {
      username: "Amy",
      password: "password"
    }
    it("should return a 201 status code if username and password are provided", async () => {
      const expectedStatusCode = 201; // really expect 201
      const expectedBody = { username: "Amy", password: "password" };

      const response = await request(server)
        .post("/register")
        .send(user);

      expect(response.status).toEqual(expectedStatusCode);
      expect(response.body.username).toEqual("Amy");
      expect(response.body.password).not.toEqual("password");
    });
    it("should give a 400 status code and not save the user if username or password is missing", async () => {
      const expectedStatus = 400;
      const expectedBody = { username: "Amy", cats: [{ "name": "Dylan"}, {"name": "Bobby"}]}

      const response = await request(server)
        .post("/register")
        .send(expectedBody);

      expect(response.status).toEqual(expectedStatus);
    });    
    });
    describe("posts to /login", () => {
      let user = {
        username: "Amy",
        password: "password"
      }
    it("should return a 200 status code if username and password are provided", async () => {
      const expectedStatusCode = 200; // really expect 201
      const expectedBody = { username: "Amy", password: "password" }

      const response = await request(server)
        .post('/login')
        .send(user)

      expect(response.status).toEqual(expectedStatusCode);
      expect(response.body).toHaveProperty('token')
      expect(response.type).toEqual("application/json");
    });
    it("should give a 400 status code and not save the user if username or password is missing", async () => {
     const expectedBody = { "username": "Jack" }
      const expectedStatus = 400;

      const response = await request(server)
        .post("/login")
        .send(expectedBody);

      expect(response.status).toEqual(expectedStatus);

    });
  });
  describe("posts to /addCat", () => {
    it('should return a 200 status code if name and gender of cat are provided', async () => {
        const expectedStatus = 200;
        const actual = { name: "Constable Archibald Crane", gender: "male", humanSlave: ["5b1ecef46d552f7ef19595e3"] }
        const expectedBody = { name: "Madame Constable Archibald Crane", gender: "male", humanSlave: ["5b1ecef46d552f7ef19595e3"] }

        const response = await request(server)
        .post("/cats")
        .send(actual)


        expect(response.status).toEqual(expectedStatus)
        expect(response.body.name).toEqual(expectedBody.name)
        
    })
  })
});
