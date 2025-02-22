import { Association, BelongsToGetAssociationMixin, BelongsToManyGetAssociationsMixin, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import BaseModel from './BaseModel';
import Item from './Item';
import Order from './Order';
import OrderLog from './OrderLog';
import RestaurantAddress from './RestaurantAddress';
import * as Enums from '../../types/enums';

class Restaurant extends BaseModel {
  public id!: number;
  public name!: string;
  public phone!: string;
  public email!: string;
  public addressId!: number;
  public imageUrl!: string | null;
  public hasDelivery!: boolean;
  public deliveryPrice!: number | null;
  public minimumPrice!: number;
  public deliveryTime!: number; // in minutes
  public isBusy!: boolean;
  public isOpen!: boolean;
  public slug!: string; //name-nHood-street-no
  public campus!: Enums.Campuses;
  public hashPassword!: string;
  public jwtSecureCode!: string;

  public readonly items?: Item[];
  public getItems!: BelongsToManyGetAssociationsMixin<Item>;

  public readonly address?: RestaurantAddress;
  public getAddress!: BelongsToGetAssociationMixin<RestaurantAddress>;

  public readonly orders?: Order[];
  public getOrders!: BelongsToManyGetAssociationsMixin<Order>;

  public readonly orderLogs?: OrderLog[];
  public getOrderLogs!: BelongsToManyGetAssociationsMixin<OrderLog>;

  public static associations: {
    address: Association<Restaurant, RestaurantAddress>;
    items: Association<Restaurant, Item>;
    orders: Association<Restaurant, Order>;
    orderLogs: Association<Restaurant, OrderLog>;
  };
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
    addressId: {
      type: DataTypes.INTEGER,
      references: {
        model: RestaurantAddress,
      },
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
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
    isOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    campus: {
      type: DataTypes.ENUM(...Object.values(Enums.Campuses)),
      allowNull: false,
    },
    hashPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jwtSecureCode: {
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

export default Restaurant;
