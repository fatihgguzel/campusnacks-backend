import { BelongsToGetAssociationMixin, DataTypes, Association } from 'sequelize';
import sequelize from '../sequelize';
import BaseModel from './BaseModel';
import Customer from './Customer';

class ShortCode extends BaseModel {
  public id!: number;
  public value!: string;

  public readonly customer!: Customer;
  public getCustomer!: BelongsToGetAssociationMixin<Customer>;

  public static associations: {
    restaurant: Association<ShortCode, Customer>;
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
