const typedefs = require('../typedefs'); // import type definitions for req, res, and next
const logger = require('../utils/logger')(module); // import a custom logger module

// parse the admin credentials from an environment variable
const creds = JSON.parse(process.env.ADMIN_CREDS);

/**
 * Middleware to validate admin access
 * @param {typedefs.Req} req
 * @param {typedefs.Res} res
 * @param {typedefs.Next} next
 */
const adminQueryCreds = async (req, res, next) => {
	try {
		// extract the user and access credentials from the query string
		const { user, access } = req.query;

		// check if the provided credentials match the stored admin credentials
		if (creds[user] === access) {
			logger.info('Admin access - ' + user); // log successful admin access
			next(); // call the next middleware function
		} else {
			// if the credentials don't match, log a warning and return a 401 response
			const unauthIP = req.headers['x-real-ip'] || req.ip; // get the client's IP address
			logger.warn('Intruder alert.', { ip: unauthIP }); // log the warning
			return res.status(401).send('Intruder alert. IP address: ' + unauthIP); // return a 401 response
		}
	} catch (error) {
		// if an error occurs, log the error and return a 500 response
		logger.error('adminQueryCreds', { error });
		return res.status(500).send({ message: 'Server Error. Try again.' });
	}
};

// export the adminQueryCreds function as a module
module.exports = {
	adminQueryCreds,
};
