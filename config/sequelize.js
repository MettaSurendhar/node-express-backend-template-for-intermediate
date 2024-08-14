module.exports = {
	// configuration for development environment
	development: {
		username: process.env.DB_USERNAME, // retrieve the PostgreSQL username from environment variables
		password: process.env.DB_PASSWORD, // retrieve the PostgreSQL password from environment variables
		host: '127.0.0.1', // specify the host as localhost
		database: process.env.DB_NAME, // retrieve the PostgreSQL database name from environment variables
		dialect: 'postgres', // specify the database dialect as PostgreSQL
	},

	// configuration for staging environment
	staging: {
		use_env_variable: 'DB_URL', // use the DB_URL environment variable to connect to the staging database
		dialect: 'postgres', // specify the database dialect as PostgreSQL
		dialectOptions: {
			ssl: true, // enable SSL encryption for the database connection
		},
	},

	// configuration for production environment
	production: {
		use_env_variable: 'DB_URL', // use the DB_URL environment variable to connect to the production database
		dialect: 'postgres', // specify the database dialect as PostgreSQL
		dialectOptions: {
			ssl: true, // enable SSL encryption for the database connection
		},
	},
};
