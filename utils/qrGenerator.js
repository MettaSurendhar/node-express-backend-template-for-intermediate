// Import the path library, which provides utilities for working with file paths.
const pathLib = require('path');

// Import the qrcode library, which generates QR codes.
const qr = require('qrcode');

// Import the logger module, which provides logging functionality.
const logger = require('./logger')(module);

// Import the getSignedJWT function, which signs data with a JSON Web Token (JWT).
const { getSignedJWT } = require('./token');

/**
 * Generates a QR code from data and writes it to a file in the tmp folder.
 * To avoid race conditions, use a unique identifier such as an email address for the id.
 * @param {string|any} data String or JSON object
 */
const qrPNGFile = (id, data) => {
	// Use the qr.toFile function to generate a QR code and write it to a file.
	// The file path is constructed using the pathLib.join function, which joins the current directory with the tmp folder and a filename.
	// The filename is constructed by concatenating "tmpQR-" with the id and ".png".
	qr.toFile(
		(path = pathLib.join(__dirname, '../tmp/tmpQR-' + id + '.png')),
		// If the data is an object, convert it to a JSON string using JSON.stringify.
		// Otherwise, use the data as is.
		(text = typeof data === 'object' ? JSON.stringify(data) : data),
		// Specify the QR code type as PNG.
		(options = { type: 'png' }),
		(err) => {
			// If an error occurs, log the error using the logger module and throw the error.
			if (err) {
				logger.error('qrPNGFile', err);
				throw err;
			}
		}
	);
};

/**
 * Generates a QR code from data after signing it with a JWT, and writes it to a file in the tmp or k-qrs folder.
 *
 * To avoid race conditions, use a unique identifier such as an email address for the id.
 * @param {string|any} data String or JSON object
 */
const qrSignedPNGFile = (id, data, tmp = true) => {
	// Sign the data with a JWT using the getSignedJWT function.
	const signedData = getSignedJWT(data);

	// Construct the QR code filename based on the id and whether it's a temporary file or not.
	const qrFilename = `${tmp ? 'tmpEncQR' : 'K-QR'}-${id}.png`;

	// Construct the target path for the QR code file.
	// If tmp is true, use the tmp folder, otherwise use the uploads/2023/k-qrs folder.
	const targetPath = pathLib.join(
		__dirname,
		'..',
		tmp ? 'tmp' : pathLib.join('uploads', '2023', 'k-qrs'),
		qrFilename
	);

	// Use the qr.toFile function to generate a QR code and write it to a file.
	qr.toFile(
		(path = targetPath),
		// If the data is an object, convert it to a JSON string using JSON.stringify.
		// Otherwise, use the signed data as is.
		(text = typeof data === 'object' ? JSON.stringify(signedData) : signedData),
		// Specify the QR code type as PNG.
		(options = { type: 'png' }),
		(err) => {
			// If an error occurs, log the error using the logger module and throw the error.
			if (err) {
				logger.error('qrSignedPNGFile', err);
				throw err;
			}
		}
	);

	// Return the QR code filename.
	return qrFilename;
};

// Export the qrPNGFile and qrSignedPNGFile functions as a module.
module.exports = {
	qrPNGFile,
	qrSignedPNGFile,
};
