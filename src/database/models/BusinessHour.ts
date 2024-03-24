import { BelongsToGetAssociationMixin, DataTypes, Association } from 'sequelize';
import sequelize from '../sequelize';
import * as Enums from '../../types/enums';
import BaseModel from './BaseModel';
import Restaurant from './Restaurant';

class BusinessHour extends BaseModel {
  public id!: number;
  public dayOfWeek!: string;
  public openingTime!: Date;
  public closingTime!: Date;
  public restaurantId!: number;

  public readonly restaurant?: Restaurant;
  public getRestaurant!: BelongsToGetAssociationMixin<Restaurant>;

  public static associations: {
    restaurant: Association<BusinessHour, Restaurant>;
  };
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
      type: DataTypes.ENUM(...Object.values(Enums.DayOfWeek)),
      allowNull: false,
      defaultValue: Enums.DayOfWeek.MONDAY,
    },
    openingTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    closingTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      references: {
        model: Restaurant,
      },
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
