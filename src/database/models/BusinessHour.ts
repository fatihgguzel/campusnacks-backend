import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import sequelize from '../sequelize';
import { DayOfWeek } from '../../types/enums';

class BusinessHour extends BaseModel {
  public id!: number;
  public dayOfWeek!: DayOfWeek;
  public openingTime!: Date; // todo date can be changed
  public closingTime!: Date;
  public restaurantId!: number;
}

BusinessHour.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    dayOfWeek: {
      type: DataTypes.ENUM(...Object.values(DayOfWeek)),
      allowNull: false,
    },
    openingTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    closingTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default BusinessHour;
