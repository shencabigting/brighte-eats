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
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobile: {
        type: DataTypes.STRING,
        unique: true,
    },
    postcode: {
        type: DataTypes.STRING,
    },
    services: {
        type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'user',
  }
);

export default User;
