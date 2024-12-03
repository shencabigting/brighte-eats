import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize.js';

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
            field: "user_id",
        },
        service: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'data',
        indexes: [
            {
                unique: true,
                fields: ['user', 'service'] // unique key on user and service fields
            },
            {
              fields: ['service'] // add index to service field
            }
        ]
    }
);

export default Lead;
