exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function(usersTable) {
		usersTable.increments();

		usersTable.string('first_name', 64).notNullable();

		usersTable.string('last_name', 64).notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
