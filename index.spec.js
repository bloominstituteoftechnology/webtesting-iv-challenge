const request = require("supertest");
const server = require("./server.js");

describe("server", () => {
  it("should respond its working", async () => {
    const response = await request(server).get("/");

    expect(response.text).toBe("its working");
  });

  describe("should be able to add cars", () => {
    it("Should let you know its working when it received a get", async () => {
      const response = await request(server).get("/vehicle/add");

      expect(response.text).toBeTruthy();
    });

    it("Should add car if make and model are sent", async () => {
      const response = await request(server)
        .post("/vehicle/add")
        .send({ make: "vw", model: "bug" });
      const expected = "You have added the vw bug to the database";

      expect(response.text).toEqual(expected);
    });

    it("Should return status code 201 if vehicle added", async () => {
      const response = await request(server)
        .post("/vehicle/add")
        .send({ make: "vw", model: "bug" });

      expect(response.status).toEqual(201);
    });
  });

  describe('Should delete vehicles', ()=> {
it('Should let you know server is running if get request sent', async()=> {
  const response = await request(server).get('/vehicles/delete')

  expect(response).toBeTruthy();
})

    it('Delete matching vehicle from DB', async ()=> {
      const response = await request(server).delete('/vehicle/delete').send({make: 'ugly', model: 'cuv'})

      expect(response.status).toBe(200);
    })

    it('Tell you what was deleted', async()=> {
      const response = await request(server).delete('/vehicle/delete').send({make: 'Jeep', model: '4dr Wrangler'})
  
      expect(response.text).toBe('You deleted a Jeep 4dr Wrangler, congrats we all know they should only be 2dr');
    })
  })
});
