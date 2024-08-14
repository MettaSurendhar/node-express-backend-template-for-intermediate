// Import the path library, which provides utilities for working with file paths.
const path = require('path');

// Import the winston logger library, which provides logging functionality.
const { createLogger, transports, config, format } = require('winston');

// Import the typedefs module, which defines custom types for the application.
const { typedefs } = require('../typedefs');

// Define a helper function to get the label for the logger.
// The label is the filename of the calling module.
const getLabel = (callingModule) => {
	const parts = callingModule.filename.split(path.sep);
	return path.join(parts[parts.length - 2], parts.pop());
};

// Define a helper function to format the metadata for the logger.
// If the metadata contains an error object, only include the name and message properties.
const logMetaReplacer = (key, value) => {
	if (key === 'error') {
		return value.name + ': ' + value.message;
	}
	return value;
};

// Define a helper function to format the logger output.
// Include the label, timestamp, log level, message, and metadata.
const logFormat = printf(({ level, message, label, timestamp, ...meta }) => {
	if (meta.error) {
		for (const key in meta.error) {
			if (typeof key !== 'symbol' && key !== 'message' && key !== 'name') {
				delete meta.error[key];
			}
		}
	}
	return `${timestamp} [${label}] ${level}: ${message}${metaFormat(meta)}`;
});

/**
 * Creates a curried function, and call it with the module in use to get logs with filename
 * @param {typedefs.Module} callingModule The module from which the logger is called
 * @returns {typedefs.Logger}
 */
const logger = (callingModule) => {
	return createLogger({
		levels: config.npm.levels,
		format: combine(
			label({ label: getLabel(callingModule) }),
			timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
			logFormat
		),
		transports: [
			new transports.Console(),
			new transports.File({ filename: __dirname + '/../logs/common.log' }),
			new transports.File({
				filename: __dirname + '/../logs/error.log',
				level: 'error',
			}),
		],
	});
};

// Export the logger function as a module.
module.exports = logger;
