# Middleware

## Middleware - functionalities that must be in the middle of the API route control flow

### Purpose

This folder contains middleware functions that handle specific tasks, such as authentication and validation, between the client request and the server response.

### Structure

The folder contains the following middleware files:

- `admin.js`: validates admin access by checking credentials against environment variables

- `captcha.js`: verifies Google ReCAPTCHA v2 responses to prevent bot attacks

### Functionality

Each middleware file exports a function that can be used to validate or authenticate requests. These functions can be used to protect routes and ensure that only authorized requests are processed.
