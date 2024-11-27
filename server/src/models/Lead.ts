import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize.js';
import User from './User.js';

class Lead extends Model {
    public id!: number;
    public user!: number;
    public service!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Lead.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        service: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'lead',
    }
);

export default Lead;
