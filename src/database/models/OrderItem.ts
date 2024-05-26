import { BelongsToGetAssociationMixin, DataTypes, Association } from 'sequelize';
import sequelize from '../sequelize';
import BaseModel from './BaseModel';
import Item from './Item';
import Order from './Order';

class OrderItem extends BaseModel {
  public id!: number;
  public itemId!: number;
  public orderId!: number;
  public count!: number;

  public readonly item?: Item;
  public getItem!: BelongsToGetAssociationMixin<Item>;

  public readonly order?: Order;
  public getOrder!: BelongsToGetAssociationMixin<Order>;

  public static associations: {
    item: Association<OrderItem, Item>;
    order: Association<OrderItem, Order>;
  };
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: Item,
      },
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
      },
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default OrderItem;
