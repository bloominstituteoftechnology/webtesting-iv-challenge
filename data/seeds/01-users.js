exports.seed = function(knex, Promise) {
	return knex('users')
	.truncate()
	.then(function() {
		return knex('users').insert([
			{
				first_name: 'Alice',
				last_name: 'Alison',
			},
			{
				first_name: 'Bob',
				last_name: 'Barley',
			},
		]);
	});
};
