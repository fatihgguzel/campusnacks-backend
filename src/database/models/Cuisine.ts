import { DataTypes, BelongsToGetAssociationMixin, Association } from 'sequelize';
import sequelize from '../sequelize';
import BaseModel from './BaseModel';
import Item from './Item';
import * as Enums from '../../types/enums';

class Cuisine extends BaseModel {
  public id!: number;
  public cuisineType!: string;

  public readonly item?: Item;
  public getItem!: BelongsToGetAssociationMixin<Item>;

  public static associations: {
    item: Association<Cuisine, Item>;
  };
}

Cuisine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    cuisineType: {
      type: DataTypes.ENUM(...Object.values(Enums.CuisineTypes)),
      defaultValue: Enums.CuisineTypes.DEFAULT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default Cuisine;
