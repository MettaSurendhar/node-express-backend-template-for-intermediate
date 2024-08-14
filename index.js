// Load the dotenv-flow package to manage environment variables
require('dotenv-flow').config();

// Import the Express.js framework and create a new instance
const express = require('express');
const app = express();

// Enable JSON and URL-encoded body parsing for incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS (Cross-Origin Resource Sharing) to allow cross-domain requests
app.use(cors());

// Enable Helmet to secure the application with HTTP headers
app.use(helmet());

// Disable the "X-Powered-By" header to prevent revealing the server technology
app.disable('x-powered-by');

// Define routes for the application (e.g. API endpoints, web pages)
// Put routes here

// Catch-all route to return a success response (200) with a message
app.use((_req, res) => {
	return res.status(200).send('Back-end for');
});

// Get the port number from the environment variables or default to 5000
const port = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(port, () => {
	// Log a message to the console when the server is listening
	logger.info(`App Listening on port ${port}`);
});
