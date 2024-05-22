import { Association, BelongsToGetAssociationMixin, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import { ProductTypes } from '../../types/enums';
import BaseModel from './BaseModel';
import Item from './Item';

class Product extends BaseModel {
  public id!: number;
  public productType!: ProductTypes;

  public readonly item?: Item;
  public getItem!: BelongsToGetAssociationMixin<Item>;

  public static associations: {
    item: Association<Product, Item>;
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
