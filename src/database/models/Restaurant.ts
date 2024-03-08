import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel';
import sequelize from '../sequelize';

class Restaurant extends BaseModel {
  public id!: number;
  public name!: string;
  public phone!: string;
  public email!: string;
  public addressId!: number; //todo add a relation
  public imageUrl!: number | null;
  public businessHourId!: number; // todo add a relation
  public hasDelivery!: boolean;
  public deliveryPrice!: number | null;
  public minimumPrice!: number;
  public deliveryTime!: number;
  public isBusy!: boolean;
}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    hasDelivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    deliveryPrice: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    minimumPrice: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    deliveryTime: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    isBusy: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default Restaurant;
