// Import the nodemailer library, which allows us to send emails programmatically.
const mailer = require('nodemailer');

// Import the logger module, which provides logging functionality.
const logger = require('./logger')(module);

// Create a mailer transporter object with authentication and base config.
// This object will be used to send emails.
const transport = mailer.createTransport({
	// Specify the SMTP host and port for Gmail.
	host: 'smtp.gmail.com',
	port: 465,
	// Use a secure connection (TLS/STARTTLS).
	secure: true,
	// Specify the email service (in this case, Gmail).
	service: 'gmail',
	// Authenticate using environment variables for the username and password.
	auth: {
		user: process.env.AUTOMAILER_ID,
		pass: process.env.AUTOMAILER_APP_PASSWD,
	},
});

/**
 * Sends an email from a web user to a mail inside the organization.
 * @param {string} mailTarget Target email address - must be within the organization.
 * @param {string} mailSubject Email subject.
 * @param {{name: string, email: string, message: string}} userData User details: name, email, and message.
 */
const inboundMailer = (mailTarget, mailSubject, userData) => {
	// Check if the target email address is within the organization.
	if (!mailTarget.endsWith('cegtechforum.in')) {
		// If not, throw an error.
		throw new Error('Invalid target mail domain.');
	}

	// Construct the email message object.
	const message = {
		// Set the recipient email address.
		to: mailTarget,
		// Set the email subject.
		subject: mailSubject,
		// Set the email body as HTML.
		html:
			// Use template literals to construct the email body.
			`<p>Name: ${userData.name}</p><p>Email: ${userData.email}</p><br/><p>Message:<br/>${userData.message}</p>`,
	};

	// Use the transporter object to send the email.
	transport.sendMail(message, (err, info) => {
		// If an error occurs, log the error using the logger module.
		if (err) {
			logger.error('Failure: QUERY mail NOT sent', { err, userData });
		} else {
			// If the email is sent successfully, log the success using the logger module.
			logger.info('Success: QUERY mail sent', { info });
		}
	});
};

// Export the inboundMailer function as a module.
module.exports = {
	inboundMailer,
};
