const { errors } = require('./errors');

const errorHandler = (err, req, res, next) => {
	// err = [http status, supplied message for errorOutput]

	if (!errors.hasOwnProperty(err[0])) throw `Uncaught Exception! Please review:\n${err}`;

	if (err[0] === 'h500') console.error('Error:\n', err[1]);

	const error = errors[err[0]];
	error.errorOutput = err[1];
	res.status(error.httpStatus).json(error);
};

const statusObj = (status, message) => {
	if (!errors.hasOwnProperty(status)) {
		return console.error('Status undefined!');
	} else {
		const statusJson = { ...errors[status] };
		statusJson.errorOutput = message;
		if (status === 'h500') console.error('Error:\n', message);
		return statusJson;
	}
};

module.exports = {
	errorHandler,
	statusObj
};
