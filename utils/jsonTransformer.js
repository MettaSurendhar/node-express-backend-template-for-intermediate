/**
 * String joins all the values of a JSON object, including nested keys
 *
 * @param {any} obj JSON object
 * @param {string} delimiter Delimiter of final string
 * @returns
 */
const getNestedValuesString = (obj, delimiter) => {
	// Initialize an empty array to store the values
	let values = [];

	// Iterate through each key-value pair in the object
	for (key in obj) {
		// Check if the value is not an object (i.e., it's a primitive type like string, number, etc.)
		if (typeof obj[key] !== 'object') {
			// If it's not an object, simply push the value to the values array
			values.push(obj[key]);
		} else {
			// If it is an object, recursively call the getNestedValuesString function on it
			// and concatenate the resulting array with the current values array
			values = values.concat(getNestedValuesString(obj[key]));
		}
	}

	// If a delimiter is provided, use it to join the values array into a string
	// Otherwise, use the default delimiter (which is a comma)
	return delimiter ? values.join(delimiter) : values.join();
};

// Export the getNestedValuesString function as a module
module.exports = {
	getNestedValuesString,
};
