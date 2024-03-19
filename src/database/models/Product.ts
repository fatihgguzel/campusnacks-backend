import { Association, BelongsToGetAssociationMixin, BelongsToManyGetAssociationsMixin, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import { ProductTypes } from '../../types/enums';
import BaseModel from './BaseModel';
import Item from './Item';
import MenuProduct from './MenuProduct';

class Product extends BaseModel {
  public id!: number;
  public productType!: string;

  public readonly item!: Item;
  public getItem!: BelongsToGetAssociationMixin<Item>;

  public readonly menuProducts!: MenuProduct[];
  public getMenuProducts!: BelongsToManyGetAssociationsMixin<MenuProduct>;

  public static associations: {
    item: Association<Product, Item>;
    menuProducts: Association<Product, MenuProduct>;
  };
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    productType: {
      type: DataTypes.ENUM(...Object.values(ProductTypes)),
      defaultValue: ProductTypes.DEFAULT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default Product;
