import { DataTypes, BelongsToGetAssociationMixin, Association } from 'sequelize';

import sequelize from '../sequelize';
import { OptionsTypes } from '../../types/enums';
import BaseModel from './BaseModel';
import Item from './Item';

class Option extends BaseModel {
  public id!: number;
  public optionsType!: string;
  public data!: JSON;

  public readonly item?: Item;
  public getItem!: BelongsToGetAssociationMixin<Item>;

  public static associations: {
    item: Association<Option, Item>;
  };
}

Option.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    optionsType: {
      type: DataTypes.ENUM(...Object.values(OptionsTypes)),
      defaultValue: OptionsTypes.DEFAULT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default Option;
