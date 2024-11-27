import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize.js';
import Lead from './Lead.js';

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public mobile!: string;
    public postcode!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        mobile: {
            type: DataTypes.STRING,
            unique: true,
        },
        postcode: {
            type: DataTypes.STRING,
            validate: {
                isInt: true,
            },
        },
    },
    {
        sequelize,
        tableName: 'user',
    }
);

// Define the association with a custom foreign key
User.hasMany(Lead, { foreignKey: 'user' });
Lead.belongsTo(User, { foreignKey: 'user' });

export default User;
