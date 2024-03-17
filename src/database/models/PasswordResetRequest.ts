import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import * as Enums from '../../types/enums';
import ShortCode from './ShortCode';
import BaseModel from './BaseModel';
import Customer from './Customer';

class PasswordResetRequest extends BaseModel {
  public id!: number;
  public customerId!: number;
  public shortCodeId!: number;
  public state!: string;
  public expireDate!: Date;
}

PasswordResetRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
      },
      allowNull: false,
    },
    shortCodeId: {
      type: DataTypes.INTEGER,
      references: {
        model: ShortCode,
      },
      unique: true,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM(...Object.values(Enums.PasswordResetRequestStates)),
      defaultValue: Enums.PasswordResetRequestStates.PENDING,
    },
    expireDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default PasswordResetRequest;
