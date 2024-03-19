import { BelongsToGetAssociationMixin, DataTypes, Association } from 'sequelize';
import sequelize from '../sequelize';
import BaseModel from './BaseModel';
import Order from './Order';

class Review extends BaseModel {
  public id!: number;
  public orderId!: number;
  public comment!: string;
  public star!: number; //todo make it enum type
  public date!: Date;

  public readonly order!: Order;
  public getOrder!: BelongsToGetAssociationMixin<Order>;

  public static associations: {
    order: Association<Review, Order>;
  };
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    star: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default Review;
