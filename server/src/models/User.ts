import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize.js';

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public mobile!: string;
    public postcode!: string;
    public services!: string;
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
        services: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmptyArray(val:string) {
                    const parsedData = JSON.parse(val);
                    if (!Array.isArray(parsedData) || parsedData.length === 0) {
                        throw new Error("Array of at least 1 value is required.");
                    }
                },
            }
        },
    },
    {
        sequelize,
        tableName: 'user',
    }
);

export default User;
