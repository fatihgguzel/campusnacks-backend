import { DataTypes, BelongsToGetAssociationMixin, BelongsToManyGetAssociationsMixin, Association } from 'sequelize';
import sequelize from '../sequelize';
import BaseModel from './BaseModel';
import Item from './Item';
import MenuProduct from './MenuProduct';

class Menu extends BaseModel {
  public id!: number;
  public hasBadge!: boolean;
  public badgeTag!: string | null;

  public readonly item!: Item;
  public getItem!: BelongsToGetAssociationMixin<Item>;

  public readonly menuProducts!: [MenuProduct];
  public getMenuProducts!: BelongsToManyGetAssociationsMixin<MenuProduct>;

  public static associations: {
    item: Association<Menu, Item>;
    menuProducts: Association<Menu, MenuProduct>;
  };
}

Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    hasBadge: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    badgeTag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default Menu;
