const request = require("supertest");
const server = require("../server");
const mongoose = require("mongoose");

describe("server.js", () => {
  it("should return OK and a JSON object from the index route", async () => {
    const expectedStat = 200;
    const expectedBody = { api: "running" };

    // Asnyc solution
    // let response;
    // return request(server).get('/').then(res => {
    //     response = res;
    // })

    // Another Asnyc soultion
    const response = await request(server).get("/");
    // .then(res => {
    // const response = res;
    expect(response.status).toEqual(expectedStat);
    expect(response.body).toEqual(expectedBody);
    expect(response.type).toEqual("application/json");
  });
});
