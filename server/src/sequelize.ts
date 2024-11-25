import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
    process.env.DB_NAME as string, // database name of your project
    process.env.DB_USER as string, // MySQL user
    process.env.DB_PASS as string, // MySQL password
    {
        host: process.env.DB_HOST as string, // MySQL host
        dialect: 'mysql',  // Specify MySQL as the database
        logging: false,    // Disable query logging
    });

export default sequelize;
