import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import BaseModel from './BaseModel';
import * as Enums from '../../types/enums';

class Cuisine extends BaseModel {
  public id!: number;
  public cuisineType!: Enums.CuisineTypes;
}

Cuisine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    cuisineType: {
      type: DataTypes.ENUM(...Object.values(Enums.CuisineTypes)),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default Cuisine;
