# Config Folder

This folder contains configuration files for the backend application.

## sequelize.js

This file contains database configuration settings for different environments (development, staging, and production). It exports an object with three properties: `development`, `staging`, and `production`, each containing settings specific to that environment.

### Environment Variables

The configuration uses environment variables to store sensitive information such as database usernames, passwords, and names. Make sure to set these variables in your environment before running the application.

- `DB_USERNAME`: PostgreSQL username
- `DB_PASSWORD`: PostgreSQL password
- `DB_NAME`: PostgreSQL database name
- `DB_URL`: PostgreSQL connection URL (used in staging and production environments)

### Configuration Settings

The configuration settings are organized as follows:

- `development`: Settings for the development environment, using environment variables for username, password, and database name.

- `staging`: Settings for the staging environment, using the DB_URL environment variable to connect to the database, with SSL encryption enabled.

- `production`: Settings for the production environment, using the DB_URL environment variable to connect to the database, with SSL encryption enabled.

Make sure to update the environment variables and configuration settings according to your specific needs.
