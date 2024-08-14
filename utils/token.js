// Import the fs module, which allows us to interact with the file system.
const fs = require('fs');

// Import the jwt module, which provides functionality for working with JSON Web Tokens.
const jwt = require('jsonwebtoken');

// Read the private key from a file specified by the PRIVKEY environment variable.
const privateKey = fs.readFileSync(process.env.PRIVKEY);

// Read the public key from a file specified by the PUBKEY environment variable.
const publicKey = fs.readFileSync(process.env.PUBKEY);

/**
 * Generate a JSON Web Token (JWT) from the provided data using the JWT secret.
 * @param {string|any} data
 * @returns {jwt.JwtPayload}
 */
const getJWT = (data) => {
	// Use the jwt.sign function to generate a JWT. We pass in the data to be signed, the JWT secret, and an options object specifying the algorithm to use (HS256).
	return jwt.sign({ id: data }, process.env.JWTSECRET, { algorithm: 'HS256' });
	// HS256 is a symmetric encryption algorithm, which means the same secret key is used for both signing and verifying.
};

/**
 * Generate a signed JWT from the provided data using the private key.
 * @param {string|any} data
 * @returns {jwt.JwtPayload}
 */
const getSignedJWT = (data) => {
	// Use the jwt.sign function to generate a signed JWT. We pass in the data to be signed, the private key, and an options object specifying the algorithm to use (RS256).
	return jwt.sign({ id: data }, privateKey, {
		algorithm: 'RS256',
		// RS256 is an asymmetric signing algorithm, which means a private key is used for signing and a corresponding public key is used for verifying.
	});
};

/**
 * Verify a JWT using the JWT secret.
 * @param {jwt.JwtPayload} data
 * @returns {string|any}
 */
const verifyJWT = (data) => {
	// Use the jwt.verify function to verify the JWT. We pass in the JWT to be verified, the JWT secret, and an options object specifying the algorithm to use (HS256).
	return jwt.verify(data, process.env.JWTSECRET, { algorithms: ['HS256'] });
};

/**
 * Verify a signed JWT using the public key.
 * @param {jwt.JwtPayload} signedString
 * @returns {string|any}
 */
const verifySignedJWT = (signedString) => {
	// Use the jwt.verify function to verify the signed JWT. We pass in the signed JWT to be verified, the public key, and an options object specifying the algorithm to use (RS256).
	return jwt.verify(signedString, publicKey, {
		algorithms: ['RS256'],
	});
};

// Export the four functions as a module.
module.exports = {
	getJWT,
	verifyJWT,
	getSignedJWT,
	verifySignedJWT,
};
