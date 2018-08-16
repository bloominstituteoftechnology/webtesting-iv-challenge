const request = require('supertest');
const server = require('./server');

describe('Server', () => {
  describe('Get requests to root', () => {
    it('receives a 200 code from server', async () => {
      const expected = 200;
      const response = await request(server).get('/');
      expect(response.status).toEqual(expected);
    });
    it('sends a 404 error on bad path', async () => {
      const expected = 404;
      const response = await request(server).get('/jkfdafja');
      expect(response.status).toEqual(expected);
    });
  });

  describe('post requests', () => {
    it('saves a post when all required fields are provided', async () => {
      const newPost = {
        userId: 1,
        title: 'Helvetica and You',
        content: 'How much do you really expect me to have to say on this subject?',
      };

      const response = await request(server)
        .post('/posts')
        .send(newPost);
      expect(response.status).toEqual(201);
      expect(typeof response.body.id).toEqual('number');
      expect(response.body.id).toBeGreaterThan(0);
    });

    it('sends a 401 error if an incomplete post is sent in via post', async () => {
      const incompletePost = {
        title: 'Incomplete posting and you',
        content: 'There\'s content here at least',
      };
      const expectedMessage = 'This resource could not be created, as it did not include all required fields.'
      const response = await request(server)
        .post('/posts')
        .send(incompletePost);
      expect(response.status).toEqual(401);
      expect(response.body.message).toEqual(expectedMessage);
    });

  });

  describe('destroy request', () => {
    const newPost = {
      userId: 1,
      title: 'Helvetica and You',
      content: 'How much do you really expect me to have to say on this subject?',
    };
    it('destroys a post when an existing id is sent', async () => {
      const { body: { id } } = await request(server)
        .post('/posts')
        .send(newPost);
      const response = await request(server).delete(`/posts/${id}`);
      expect(response.status).toEqual(204);
    });

    it('sends an error if a request is made for deletion of a non-existent post', async () => {
      const expectedMessage = 'Did not find the requested resource to delete';
      const response = await request(server).delete(`/posts/3.1`);
      expect(response.status).toEqual(404);
      expect(response.body.message).toEqual(expectedMessage);
    });
  });
});
