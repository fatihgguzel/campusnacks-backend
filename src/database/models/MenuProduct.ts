import { Association, BelongsToGetAssociationMixin, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import BaseModel from './BaseModel';
import Menu from './Menu';
import Product from './Product';

class MenuProduct extends BaseModel {
  public id!: number;
  public productId!: number;
  public menuId!: number;

  public readonly product?: Product;
  public getProduct!: BelongsToGetAssociationMixin<Product>;

  public readonly menu?: Menu;
  public getMenu!: BelongsToGetAssociationMixin<Menu>;

  public static associations: {
    product: Association<Product, Product>;
    menu: Association<Product, Menu>;
  };
}

MenuProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
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
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default MenuProduct;
