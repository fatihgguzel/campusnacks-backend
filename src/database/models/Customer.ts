import { Association, BelongsToGetAssociationMixin, DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import { CustomerRoleTypes } from '../../types/enums';
import ShortCode from './ShortCode';

class Customer extends Model {
  public id!: number;
  public email!: string;
  public fullName!: string;
  public addressId!: number;
  public verificationShortCodeId!: number | null;
  public verificationDate!: Date | null;
  public phoneNumber!: string;
  public role!: string;
  public hashPassword!: string | null; //TODO implement googleAuth
  public studentshipExpiresAt!: Date | null; //TODO cron job to change role after expiration
  public jwtSecureCode!: string;

  public readonly verificationShortCode?: ShortCode | null;
  public getVerificationShortCode!: BelongsToGetAssociationMixin<ShortCode>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  public static associations: {
    verificationShortCode: Association<Customer, ShortCode>;
  };
}

Customer.init(
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
      // TODO references: {}
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
      type: DataTypes.ENUM(...Object.values(CustomerRoleTypes)),
      defaultValue: CustomerRoleTypes.DEFAULT,
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

export default Customer;
