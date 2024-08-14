# Database

## Database ORM (mainly Sequelize's) models

### Purpose

This folder contains database ORM (Object-Relational Mapping) models, mainly using Sequelize, which define the structure and relationships of the database tables.

### Structure

The folder contains the following files:

- `index.js`: The main entry point for the models, which loads and initializes all model definitions, sets up associations between models, and exports the database models as a module.

### Content

The `index.js` file:

- Imports required modules, including Sequelize and a custom logger.

- Loads the Sequelize configuration for the current environment.

- Creates a new Sequelize instance and authenticates with the database.

- Reads and initializes model definitions from the current folder, filtering out non-JS files and the current file.

- Sets up defined associations between models.

- Exports the database models as a module, including the Sequelize instance and Sequelize library.
