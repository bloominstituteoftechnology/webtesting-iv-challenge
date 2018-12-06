const db = require('../data/dbConfig');

module.exports = {
	insert,
	remove
};

async function insert(fighter) {
	const [ id ] = await db('fighters').insert(fighter);

	return db('fighters').where({ id }).first();
}

async function remove(fighter) {
	return db('fighters').delete(fighter);
}
