import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import BaseModel from './BaseModel';

class ShortCode extends BaseModel {
  public id!: number;
  public value!: string;
}

ShortCode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default ShortCode;
