/**
 * Returns a timestamp string to use for timestamped files
 * @returns {string} String of current datetime in YYYY.MM.DD-HH:MM:SS format
 */
const dateForFilename = () => {
	// Create a new Date object to get the current date and time
	const dt = new Date();

	// Use template literals to construct the timestamp string
	// in the format YYYY.MM.DD-HH:MM:SS
	return `${dt.getFullYear()}-${
		dt.getMonth() + 1
	}-${dt.getDate()}-${dt.getHours()}-${dt.getMinutes()}-${dt.getSeconds()}`;
};

// Export the dateForFilename function as a module
module.exports = {
	dateForFilename,
};
