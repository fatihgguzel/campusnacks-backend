import { Association, BelongsToGetAssociationMixin, BelongsToManyGetAssociationsMixin, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import * as Enums from '../../types/enums';
import BaseModel from './BaseModel';
import ShortCode from './ShortCode';
import Order from './Order';
import UserAddress from './UserAddress';

class User extends BaseModel {
  public id!: number;
  public email!: string;
  public fullName!: string;
  public addressId!: number;
  public verificationShortCodeId!: number | null; // TODO change this into email verification
  public verificationDate!: Date | null; // TODO change this into email verification
  public phoneNumber!: string;
  public role!: string;
  public provider!: string;
  public hashPassword!: string | null; //TODO implement googleAuth
  public studentshipExpiresAt!: Date | null; //TODO cron job to change role after expiration
  public jwtSecureCode!: string;

  public readonly address!: UserAddress;
  public getAddress!: BelongsToGetAssociationMixin<UserAddress>;

  public readonly verificationShortCode?: ShortCode | null;
  public getVerificationShortCode!: BelongsToGetAssociationMixin<ShortCode>;

  public readonly orders!: Order[];
  public getOrders!: BelongsToManyGetAssociationsMixin<Order>;

  public static associations: {
    verificationShortCode: Association<User, ShortCode>;
    address: Association<User, UserAddress>;
    orders: Association<User, Order>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressId: {
      type: DataTypes.INTEGER,
      references: {
        model: UserAddress,
      },
      defaultValue: null,
      allowNull: true,
    },
    verificationShortCodeId: {
      type: DataTypes.INTEGER,
      references: {
        model: ShortCode,
      },
      defaultValue: null,
      allowNull: true,
    },
    verificationDate: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(Enums.UserRoleTypes)),
      defaultValue: Enums.UserRoleTypes.DEFAULT,
      allowNull: false,
    },
    provider: {
      type: DataTypes.ENUM(...Object.values(Enums.UserProviders)),
      defaultValue: Enums.UserProviders.CAMPUSNACKS,
      allowNull: false,
    },
    hashPassword: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    studentshipExpiresAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    jwtSecureCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  },
);

export default User;
