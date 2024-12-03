import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

// Specify the path to your .env file in the project's root directory
dotenv.config({ path: './../.env' });

const sequelize = new Sequelize(
    process.env.DATABASE_NAME, // database name of your project
    process.env.DATABASE_USER, // MySQL user
    process.env.DATABASE_PASSWORD, // MySQL password
    {
        host: process.env.DATABASE_HOST, // MySQL host
        dialect: 'mysql',  // Specify MySQL as the database
        logging: false,    // Disable query logging
    });

export default sequelize;
