const db = require('../data/dbConfig');
const fighters = require('./middleware');

beforeEach(async () => {
	await db('fighters').truncate();
});

describe('Middlaware test', () => {
	describe('Insert feature', () => {
		it('should insert a given fighter', async () => {
			let rows = await db('fighters').where({ name: 'Ryu' });
			rows = await db('fighters').insert({ name: 'Dhalsim ' });
			expect(rows).toHaveLength(1);
		});
	});
	describe('Delete feature', () => {
		it('Should remove a given fighter', async () => {
			let row = await db('fighters');
			await fighters.remove({ name: 'Ryu' });
			expect(row).toHaveLength(0);
		});
	});
});
