import { DataTypes } from 'sequelize';

import sequelize from '../sequelize';
import { OptionsTypes } from '../../types/enums';
import BaseModel from './BaseModel';

class Option extends BaseModel {
  public id!: number;
  public optionsType!: string;
  public data!: JSON;
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
