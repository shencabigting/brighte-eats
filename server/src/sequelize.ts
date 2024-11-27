import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

// Specify the path to your .env file in the project's root directory
dotenv.config({ path: './../.env' });

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE as string, // database name of your project
    process.env.MYSQL_USER as string, // MySQL user
    process.env.MYSQL_PASSWORD as string, // MySQL password
    {
        host: process.env.MYSQL_HOST as string, // MySQL host
        dialect: 'mysql',  // Specify MySQL as the database
        logging: false,    // Disable query logging
    });

export default sequelize;
