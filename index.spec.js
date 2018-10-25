const request = require('supertest');

const server = require('./api/apiRoutes');

describe('server', () => {
    describe('initial tests', () => {
        it('should return true', () => {
            expect(true).toBeTruthy();
        });
        it('should return false', () => {
            expect(false).toBeFalsy();
        });
    });
    describe('route handlers', () => {
        describe('GET /api', () => {
            it('should return 200 OK', async () => {
                const response = await request(server).get('/api');
    
                expect(response.status).toBe(200);
            });
            it('should return JSON', async () => {
                const response = await request(server).get('/api');

                expect(response.type).toBe('application/json');
            });
            it('should return { message: "server is up" }', async () => {
                const response = await request(server).get('/api');

                expect(response.body).toEqual({ message: 'server is up' });
            });
        });

        describe('GET /api/students', () => {
            it('should return students', (done) => {
                request(server)
                .get('/api/students')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
        });

        describe('GET /api/students/:id', () => {
            it('should return a student', (done) => {
                request(server)
                .get('/api/students/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
            it('should return undefined', (done) => {
                request(server)
                .get('/api/students/59')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
            });
        });

        describe('POST /api/students', () => {
            it('should add a student', (done) => {
                request(server)
                .post('/api/students')
                .send({ "class": "UX4", "name": "Jodocus Krizman" })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
            });
            it('should not add a student', (done) => {
                request(server)
                .post('/api/students')
                .send({ "class": "iOS1" })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err) => {
                    if (err) return done(err);
                    done();
                });
            });
        });
    });
});