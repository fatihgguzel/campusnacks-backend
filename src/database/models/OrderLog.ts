import { BelongsToGetAssociationMixin, DataTypes, Association } from 'sequelize';
import sequelize from '../sequelize';
import BaseModel from './BaseModel';
import Restaurant from './Restaurant';
import Order from './Order';

class OrderLog extends BaseModel {
  public id!: number;
  public csComission!: number; // todo make it enum
  public orderId!: number;
  public restaurantId!: number;

  public readonly order?: Order;
  public getOrder!: BelongsToGetAssociationMixin<Order>;

  public readonly restaurant?: Restaurant;
  public getRestaurant!: BelongsToGetAssociationMixin<Restaurant>;

  public static associations: {
    order: Association<OrderLog, Order>;
    restaurant: Association<OrderLog, Restaurant>;
  };
}

OrderLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    csComission: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
      },
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

export default OrderLog;
