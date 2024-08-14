const fetch = require('cross-fetch'); // import the cross-fetch library for making HTTP requests

const typedefs = require('../typedefs'); // import type definitions for req, res, and next
const logger = require('../utils/logger')(module); // import a custom logger module

/**
 * Google ReCAPTCHA v2 verification
 *
 * @param {typedefs.Req} req
 * @param {typedefs.Res} res
 * @param {typedefs.Next} next
 */
const verifyCaptcha = async (req, res, next) => {
	try {
		const secretKey = process.env.CAPTCHA_SECRET; // get the secret key from environment variables

		// construct the URL for the ReCAPTCHA verification API
		const verifyCaptchaURL = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;

		// make a GET request to the ReCAPTCHA API to verify the user's response
		const captchaResp = await fetch(verifyCaptchaURL);

		// parse the response as JSON
		const captchaData = await captchaResp.json();

		// if the verification fails, log an error and return a 403 response
		if (captchaData.success !== undefined && !captchaData.success) {
			logger.error('Recaptcha', { captchaData });
			return res.status(403).send({
				message: 'Failed captcha verification',
			});
		}

		// if the verification succeeds, call the next middleware function
		next();
	} catch (error) {
		// if an error occurs, log the error and return a 500 response
		logger.error('Error', { error });
		return res.status(500).send({ message: 'Server Error. Try again.' });
	}
};

// export the verifyCaptcha function as a module
module.exports = {
	verifyCaptcha,
};
