import { Association, BelongsToGetAssociationMixin, DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import sequelize from '../sequelize';
import { DayOfWeek } from '../../types/enums';
import Restaurant from './Restaurant';

class BusinessHour extends BaseModel {
  public id!: number;
  public dayOfWeek!: DayOfWeek;
  public openingTime!: Date; // todo date can be changed
  public closingTime!: Date;
  public restaurantId!: number;

  public readonly restaurant!: Restaurant;
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
