# Utils

## General, reusable functionalities unrelated to API

### Purpose

The utils folder contains a collection of utility functions and modules that can be used throughout the application to perform various tasks, such as file archiving, date formatting, form data manipulation, JSON transformation, logging, mailing, QR code generation, encryption, and token management.

### Structure

The utils folder contains the following files:

- `archiver.js`: A module for archiving files and directories.
- `dateFormatter.js`: A module for formatting dates and timestamps.
- `formData.js`: A module for building and manipulating form data.
- `jsonTransformer.js`: A module for transforming JSON data.
- `logger.js`: A module for logging messages and errors.
- `mailer.js`: A module for sending emails.
- `qrGenerator.js`: A module for generating QR codes.
- `quickEncrypt.js`: A module for encrypting and decrypting data.
- `sendAttachment.js`: A module for sending attachments as CSV files.
- `token.js`: A module for generating and verifying JSON Web Tokens (JWTs).

### Content

Each file in the utils folder exports one or more functions or modules that can be used to perform specific tasks. The functions and modules are designed to be reusable and can be imported and used throughout the application.

## Modules and Functions

### Archiver

- `zipDirectory`: Archives a directory and its contents into a ZIP file.

### Date Formatter

- `dateForFilename`: Generates a date string in the format YYYY-MM-DD-HH-MM-SS for use in file names.

### Form Data

- `buildFormData`: Recursively builds a FormData object from a JavaScript object.
- `jsonToFormData`: Converts a JSON object to a FormData object.

### JSON Transformer

- `getNestedValuesString`: Retrieves nested values from a JSON object and returns them as a string.

### Logger

- `logger`: A custom logger module that provides logging functionality with support for multiple transports (console, file).

### Mailer

- `inboundMailer`: Sends an email with a custom template and attachments.

### QR Generator

- `qrPNGFile`: Generates a QR code as a PNG file.
- `qrSignedPNGFile`: Generates a signed QR code as a PNG file.

### Quick Encrypt

- `generate`: Generates a public-private key pair.
- `encrypt`: Encrypts a payload string using a public key.
- `decrypt`: Decrypts an encrypted string using a private key.

### Send Attachment

- `sendCSV`: Sends a CSV file as an attachment in response to an HTTP request.

### Token

- `getJWT`: Generates a JSON Web Token (JWT) from a payload.
- `verifyJWT`: Verifies a JWT token.
- `getSignedJWT`: Generates a signed JWT token from a payload.
- `verifySignedJWT`: Verifies a signed JWT token.

## Usage

To use a utility function or module, simply import it into your JavaScript file and call the desired function or method.
