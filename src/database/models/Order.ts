import { BelongsToGetAssociationMixin, DataTypes, Association } from 'sequelize';
import sequelize from '../sequelize';
import * as Enums from '../../types/enums';
import BaseModel from './BaseModel';
import Customer from './Customer';
import Restaurant from './Restaurant';
import Review from './Review';
import OrderLog from './OrderLog';

class Order extends BaseModel {
  public id!: number;
  public customerId!: number;
  public restaurantId!: number;
  public status!: string;
  public orderDate!: Date;
  public deliveredDate!: Date | null;
  public deliveryType!: string;

  public readonly customer!: Customer;
  public getCustomer!: BelongsToGetAssociationMixin<Customer>;

  public readonly restaurant!: Restaurant;
  public getRestaurant!: BelongsToGetAssociationMixin<Restaurant>;

  public readonly review!: Review | null;
  public getReview!: BelongsToGetAssociationMixin<Review | null>;

  public readonly orderLog!: OrderLog;
  public getOrderLog!: BelongsToGetAssociationMixin<Review | null>;

  public static associations: {
    customer: Association<Order, Customer>;
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
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
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
      defaultValue: Enums.OrderStatusTypes.DEFAULT,
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
      defaultValue: Enums.DeliveryTypes.DEFAULT,
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
