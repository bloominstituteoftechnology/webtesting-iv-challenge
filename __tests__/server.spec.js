const request = require("supertest");
const server = require("../server.js");
const fightersData = require("../data/fighters.js");

describe("server.js", () => {
  it("runs the tests", () => {
    expect(true).toBeTruthy();
  });

  describe("GET /", () => {
    it("returns a 200 (OK) status code", async () => {
      // get access to the server
      // use supertest to make a GET to the server
      const response = await request(server).get("/");

      expect(response.status).toEqual(200);
    });

    it("correctly passing req.body check", async () => {
      const expectedBody = { api: "running" };
      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });
  });
  describe("DBZ Endpoints", () => {
    describe("GET ALL fighters", () => {
      it("returns a 200 (OK) status code", async () => {
        const response = await request(server).get("/fighters");

        expect(response.status).toEqual(200);
      });
      it("should display a list of all fighters", async () => {
        const response = await request(server).get("/fighters");

        expect(response.body).toEqual(fightersData);
      });
    });

    describe("GET SINGLE fighter", () => {
      it("returns a 200 (OK) status code", async () => {
        const response = await request(server).get("/fighters/0");

        expect(response.status).toEqual(200);
      });
      it("should display a list of all fighters", async () => {
        const response = await request(server).get("/fighters/0");

        expect(response.body).toEqual([fightersData.fighters[0]]);
      });
    });

    describe("POST new fighter", () => {
      it("returns a 200 (OK) status code", async () => {
        const response = await request(server).get("/fighters");

        expect(response.status).toEqual(200);
      });
      it("should display all fighters (including newFighter)", async () => {
        const response = await request(server)
          .post("/fighters")
          .send(fightersData.newFighter);
        const updatedFighterData = fightersData.fighters;
        let newFighter = fightersData.newFighter;
        newFighter.id = fightersData.fighters.length.toString();
        expect(response.body).toEqual(updatedFighterData);
      });
    });

    describe("DELETE fighter", () => {
      it("returns a 200 (OK) status code", async () => {
        const response = await request(server).get("/fighters");

        expect(response.status).toEqual(200);
      });
      it("should display all fighters (excluding delete fighter)", async () => {
        const fighterToDeleteId = "1";
        let newFightersArray = [];
        for (let i = 0; i < fightersData.fighters.length; i++) {
          if (fightersData.fighters[i].id !== fighterToDeleteId) {
            newFightersArray.push(fightersData.fighters[i]);
          }
        }
        const response = await request(server).delete(
          `/fighters/${fighterToDeleteId}`,
        );

        expect(response.body).toEqual(newFightersArray);
      });
    });
  });
});
