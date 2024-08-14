/**
 * Recursively builds a FormData object from a JSON object
 *
 * @param {FormData} formData The FormData object to build
 * @param {object} data The JSON object to convert
 * @param {string} parentKey The parent key for nested objects
 */
function buildFormData(formData, data, parentKey) {
	// Check if the data is an object and not a Date instance
	if (data && typeof data === 'object' && !(data instanceof Date)) {
		// Iterate through each key-value pair in the object
		Object.keys(data).forEach((key) => {
			// Recursively call buildFormData for each nested object
			// and construct the key for the FormData object
			buildFormData(
				formData,
				data[key],
				parentKey ? `${parentKey}[${key}]` : key
			);
		});
	} else {
		// If the data is not an object, append it to the FormData object
		// with the constructed key
		const value = data == null ? '' : data; // handle null values
		formData.append(parentKey, value);
	}
}

/**
 * Converts a JSON object to a FormData object
 *
 * @param {object} data The JSON object to convert
 * @returns {FormData} The converted FormData object
 */
function jsonToFormData(data) {
	// Create a new FormData object
	const formData = new FormData();

	// Call the buildFormData function to populate the FormData object
	buildFormData(formData, data);

	// Return the populated FormData object
	return formData;
}

// Export the jsonToFormData and buildFormData functions as a module
module.exports = {
	jsonToFormData,
	buildFormData,
};
