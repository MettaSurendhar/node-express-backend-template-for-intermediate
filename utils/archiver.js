const fs = require('fs'); // import the file system module
const archiver = require('archiver'); // import the archiver module for creating archives (e.g. zip files)

/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(sourceDir, outPath) {
	// Create a new archiver instance, specifying the type as 'zip' and compression level as 9 (highest)
	const archive = archiver('zip', { zlib: { level: 9 } });

	// Create a write stream to the output file
	const stream = fs.createWriteStream(outPath);

	// Return a promise that resolves when the archiving process is complete
	return new Promise((resolve, reject) => {
		// Add the source directory to the archive, without including the directory itself in the archive
		archive
			.directory(sourceDir, false)

			// Handle any errors that occur during the archiving process
			.on('error', (err) => reject(err))

			// Pipe the archive data to the write stream
			.pipe(stream);

		// When the write stream is closed, resolve the promise
		stream.on('close', () => resolve());

		// Finalize the archiving process
		archive.finalize();
	});
}

// Export the zipDirectory function as a module
module.exports = {
	zipDirectory,
};
