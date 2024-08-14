// Import the crypto module, which provides cryptographic functionality in Node.js.
const crypto = require('crypto');

// Define an array of acceptable bit sizes for key generation.
const acceptableBitSizes = [1024, 2048];

/**
 * Generate a public and private key pair with the specified size in bits.
 * @param {number} sizeInBits - The size of the key in bits (must be 1024 or 2048).
 * @returns {object} - An object containing the public and private key pair.
 */
exports.generate = (sizeInBits) => {
	// Check if the provided size is in the acceptable range.
	if (!acceptableBitSizes.includes(sizeInBits)) {
		// If not, throw an error with a helpful message.
		throw Error(
			'Error generating public and private key. Key size can only be 1024 or 2048. Example usage: ` let keys = QuickEncrypt.generate(2048); `'
		);
	}
	// Use the keypair function to generate the key pair with the specified size.
	return keypair({ bits: sizeInBits });
};

/**
 * Encrypt a string payload using a public key.
 * @param {string} payloadString - The string to be encrypted.
 * @param {string} publicKey - The public key to use for encryption.
 * @returns {string} - The encrypted string in hexadecimal format.
 */
exports.encrypt = (payloadString, publicKey) => {
	// Check if the payload and public key are both strings.
	if (typeof payloadString !== 'string' || typeof publicKey !== 'string') {
		// If not, throw an error with a helpful message.
		throw Error(
			"Error encrypting. Payload and Public Key should be in text format. Example usage: ` let encryptedText = QuickEncrypt.encrypt('Some secret text here!', 'the public RSA key in text format here'); ` "
		);
	}
	// Use the crypto.publicEncrypt function to encrypt the payload using the public key.
	// Convert the payload to a Buffer from a UTF-8 string.
	return crypto
		.publicEncrypt(publicKey, Buffer.from(payloadString, 'utf8'))
		.toString('hex');
};

/**
 * Decrypt an encrypted string using a private key.
 * @param {string} encryptedString - The encrypted string to be decrypted.
 * @param {string} privateKey - The private key to use for decryption.
 * @returns {string} - The decrypted string.
 */
exports.decrypt = (encryptedString, privateKey) => {
	// Check if the encrypted string and private key are both strings.
	if (typeof encryptedString !== 'string' || typeof privateKey !== 'string') {
		// If not, throw an error with a helpful message.
		throw Error(
			"Error decrypting. Decrypted Text and Private Key should be in text format. Example usage: ` let decryptedText = QuickEncrypt.decrypt('asddd213d19jenacanscasn', 'the private RSA key in text format here'); ` "
		);
	}
	// Use the crypto.privateDecrypt function to decrypt the encrypted string using the private key.
	// Convert the encrypted string to a Buffer from a hexadecimal string.
	return crypto
		.privateDecrypt({ key: privateKey }, Buffer.from(encryptedString, 'hex'))
		.toString();
};
