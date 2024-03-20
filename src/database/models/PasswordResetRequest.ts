import { Association, BelongsToGetAssociationMixin, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import * as Enums from '../../types/enums';
import ShortCode from './ShortCode';
import BaseModel from './BaseModel';
import Customer from './Customer';

class PasswordResetRequest extends BaseModel {
  public id!: number;
  public customerId!: number;
  public passwordResetShortCodeId!: number;
  public state!: string;
  public expireDate!: Date;

  public readonly passwordResetShortCode?: ShortCode | null;
  public getpasswordResetShortCode!: BelongsToGetAssociationMixin<ShortCode>;

  public readonly customer?: Customer | null;
  public getCustomer!: BelongsToGetAssociationMixin<Customer>;

  public static associations: {
    passwordResetShortCode: Association<PasswordResetRequest, ShortCode>;
    customer: Association<PasswordResetRequest, Customer>;
  };
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
    passwordResetShortCodeId: {
      type: DataTypes.INTEGER,
      references: {
        model: ShortCode,
      },
      unique: true,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM(...Object.values(Enums.PasswordResetRequestStates)),
      allowNull: false,
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
