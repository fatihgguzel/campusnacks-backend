import { DataTypes, BelongsToGetAssociationMixin, BelongsToManyGetAssociationsMixin, Association } from 'sequelize';
import sequelize from '../sequelize';
import BaseModel from './BaseModel';
import Cuisine from './Cuisine';
import Menu from './Menu';
import Product from './Product';
import Restaurant from './Restaurant';
import OrderItem from './OrderItem';
import Option from './Option';

class Item extends BaseModel {
  public id!: number;
  public hasDiscount!: boolean;
  public discount!: number | null;
  public name!: string;
  public description!: string;
  public imageUrl!: string | null;
  public price!: number;
  public restaurantId!: number;
  public cuisineId!: number;
  public productId!: number; // todo make it nullable
  public menuId!: number; // todo make it nullable
  public optionId!: number | null;

  public readonly restaurant?: Restaurant;
  public getRestaurant!: BelongsToGetAssociationMixin<Restaurant>;

  public readonly cuisine?: Cuisine;
  public getCuisine!: BelongsToGetAssociationMixin<Cuisine>;

  public readonly product?: Product;
  public getProduct!: BelongsToGetAssociationMixin<Product>;

  public readonly menu?: Menu;
  public getMenu!: BelongsToGetAssociationMixin<Menu>;

  public readonly orderItems?: OrderItem[];
  public getOrderItems!: BelongsToManyGetAssociationsMixin<OrderItem>;

  public readonly option?: Option | null;
  public getOption!: BelongsToGetAssociationMixin<Option>;

  public static associations: {
    restaurant: Association<Item, Restaurant>;
    cuisine: Association<Item, Cuisine>;
    product: Association<Item, Product>;
    menu: Association<Item, Menu>;
    orderItems: Association<Item, OrderItem>;
    option: Association<Item, Option>;
  };
}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    hasDiscount: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      references: {
        model: Restaurant,
      },
      allowNull: false,
    },
    cuisineId: {
      type: DataTypes.INTEGER,
      references: {
        model: Cuisine,
      },
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
      },
      allowNull: false,
    },
    menuId: {
      type: DataTypes.INTEGER,
      references: {
        model: Menu,
      },
      allowNull: false,
    },
    optionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Option,
      },
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default Item;
