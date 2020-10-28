const expressLoader = require('./express');
const lastErrorHandler = require('./errorHandler');

exports.init = app => {
	expressLoader(app);
	lastErrorHandler(app);
};
