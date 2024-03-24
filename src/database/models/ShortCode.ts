import { BelongsToGetAssociationMixin, DataTypes, Association } from 'sequelize';
import sequelize from '../sequelize';
import BaseModel from './BaseModel';
import User from './User';

class ShortCode extends BaseModel {
  public id!: number;
  public value!: string;

  public readonly user?: User;
  public getUser!: BelongsToGetAssociationMixin<User>;

  public static associations: {
    restaurant: Association<ShortCode, User>;
  };
}

ShortCode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default ShortCode;
