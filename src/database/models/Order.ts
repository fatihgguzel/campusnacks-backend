import { BelongsToGetAssociationMixin, DataTypes, Association } from 'sequelize';
import sequelize from '../sequelize';
import * as Enums from '../../types/enums';
import BaseModel from './BaseModel';
import User from './User';
import Restaurant from './Restaurant';
import Review from './Review';
import OrderLog from './OrderLog';
import OrderItem from './OrderItem';

class Order extends BaseModel {
  public id!: number;
  public userId!: number;
  public restaurantId!: number;
  public status!: Enums.OrderStatusTypes;
  public orderDate!: Date;
  public deliveredDate!: Date | null;
  public deliveryType!: Enums.DeliveryTypes;

  public readonly orderItems?: OrderItem[];
  public getOrderItems!: BelongsToGetAssociationMixin<OrderItem>;

  public readonly user?: User;
  public getUser!: BelongsToGetAssociationMixin<User>;

  public readonly restaurant?: Restaurant;
  public getRestaurant!: BelongsToGetAssociationMixin<Restaurant>;

  public readonly review?: Review | null;
  public getReview!: BelongsToGetAssociationMixin<Review>;

  public readonly orderLog?: OrderLog;
  public getOrderLog!: BelongsToGetAssociationMixin<Review>;

  public static associations: {
    orderItems: Association<Order, OrderItem>;
    user: Association<Order, User>;
    restaurant: Association<Order, Restaurant>;
    review: Association<Order, Review>;
    orderLog: Association<Order, OrderLog>;
  };
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
      },
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Restaurant,
      },
    },
    status: {
      type: DataTypes.ENUM(...Object.values(Enums.OrderStatusTypes)),
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deliveredDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deliveryType: {
      type: DataTypes.ENUM(...Object.values(Enums.DeliveryTypes)),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default Order;
