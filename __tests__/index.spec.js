const request = require('supertest');

const server = require('../server.js');
const { errors } = require('../api/ErrorHandler/errorhandler');

describe('~~ server.js ~~', () => {
	const statusObj = (status, message) => {
		if (!errors.hasOwnProperty(status)) {
			return console.error('Status undefined!');
		} else {
			let statusJson = { ...errors[status] };
			statusJson.errorOutput = message;
			return statusJson;
		}
	};

	describe('~~ GET something without a route ~~', () => {
		it('should return status 404 (not found) when browsing to "/"', async () => {
			const response = await request(server).get('/');
			expect(response.status).toBe(404);
		});

		// without async
		// it('should return status 404 (not found) when browsing to "/"', () => {
		//     return request(server).get('/').then((res) => expect(res.status).toBe(404));
		// });

		it('should return JSON', async () => {
			const response = await request(server).get('/');
			expect(response.type).toBe('application/json');
		});

		it('should return a custom JSON 404 status object when GET "/"', async () => {
			const expected = statusObj('h404', `The requested path '/' doesn't exist.`);
			const response = await request(server).get('/');
			expect(response.body).toEqual(expected);
		});
	});

	describe('~~ POST ~~', () => {});
});
