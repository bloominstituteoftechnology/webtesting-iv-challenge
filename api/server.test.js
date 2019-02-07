describe("POST/movies endpoint", () => {
  it("should respond with status code 201 created", async () => {
    let body = { movies: "The Godfather" };
    let res = await request(server)
      .post("/movies")
      .send(body);
    expect(res.status).toBe(201);
  });
  it("should return the id of the item created", async () => {
    let body = { movies: "The Godfather" };
    let res = await request(server)
      .post("/movies")
      .send(body);
    expect(res.body).toEqual([1]);
  });
});
