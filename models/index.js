'use strict';
const fs = require('fs'); // import the file system module
const path = require('path'); // import the path module for working with file paths
const Sequelize = require('sequelize'); // import the Sequelize ORM library
const logger = require('../utils/logger')(module); // import a custom logger module
const basename = path.basename(__filename); // get the current file name
const env = process.env.NODE_ENV || 'development'; // set the environment to development if not set
const config = require(__dirname + '/../config/sequelize.js')[env]; // load the Sequelize config for the current environment
const db = {}; // initialize an empty object to store our database models

// Create a new Sequelize instance, using either an environment variable or a config object
let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

// Authenticate with the database, logging success or error
sequelize.authenticate().then(
	() => {
		logger.info('Sequelize auth success'); // log success
	},
	(err) => {
		logger.error('Sequelize auth error', { err }); // log error
	}
);

// Read model definitions from the current folder
fs.readdirSync(__dirname) // read the current directory
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		); // filter out non-JS files and the current file
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		); // import and initialize each model
		db[model.name] = model; // add the model to our db object
	});

// Setup defined associations between models
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db); // call the associate method on each model
	}
});

// Add the Sequelize instance and Sequelize library to our db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the db object as a module
module.exports = db;
