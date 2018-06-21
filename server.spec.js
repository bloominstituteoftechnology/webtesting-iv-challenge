const request = require('supertest');
const server = require('./server');


describe('server', () => {

  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/testingdb")
      .then(console.log("connected to test db"));
  });

  beforeEach(() => {});
  afterEach(() => {
    return Book.remove();
  });

  afterAll(() => {
    return mongoose.disconnect();
  });

  it('should return ok', async () => {
    const expectedBody = {
      api: 'api running'
    };

    const response = await request(server).get('/');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(expectedBody);

  });

  test("It should respond to the delete method", () => {
    return request(server)
      .delete("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("It should respond to the delete book by id", async () => {
    const book = {
      title: "lotr",
      password: "somethingsafe"
    };

    const savedBook = await Book.create(book);

    return request(server)
      .delete(`/${savedBook._id}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });


});