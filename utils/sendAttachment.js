// Import the typedefs module, which contains type definitions for our application.
const typedefs = require('../typedefs');

// Import the fast-csv module, which provides functionality for working with CSV data.
const fastCSV = require('fast-csv');

// Import the stream module, which provides functionality for working with streams in Node.js.
const stream = require('stream');

/**
 * Sends object data from Sequelize after formatting into CSV
 *
 * @param {typedefs.Res} res Express response object
 * @param {string} filename Filename for attachment. Prefer timestamped names
 * @param {any[]} data Data from database queries, without metadata
 * @returns
 */
const sendCSV = async (res, filename, data) => {
	// Use the fastCSV.writeToBuffer function to convert the data into a CSV buffer.
	// The { headers: true } option tells fastCSV to include the column headers in the CSV output.
	const csvData = await fastCSV.writeToBuffer(data, { headers: true });

	// Create a new PassThrough stream, which is a stream that simply passes the data through without modifying it.
	// This is used to pipe the CSV data to the response object.
	const fileStream = new stream.PassThrough();

	// End the stream with the CSV data.
	fileStream.end(csvData);

	// Set the response attachment filename to the provided filename with a .csv extension.
	res.attachment(filename + '.csv');

	// Set the response content type to text/csv.
	res.type('text/csv');

	// Pipe the file stream to the response object, which will send the CSV data to the client.
	fileStream.pipe(res);

	// Return from the function.
	return;
};

// Export the sendCSV function as a module.
module.exports = {
	sendCSV,
};
