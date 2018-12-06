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
})