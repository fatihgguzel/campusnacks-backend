import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import BaseModel from './BaseModel';

//todo: divide into two part Customer-address, Restaurant-address
class Address extends BaseModel {
  public id!: number;
  public city!: string;
  public district!: string;
  public address!: string;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default Address;
