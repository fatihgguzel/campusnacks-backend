import { Association, BelongsToGetAssociationMixin, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import * as Enums from '../../types/enums';
import ShortCode from './ShortCode';
import BaseModel from './BaseModel';
import User from './User';

class PasswordResetRequest extends BaseModel {
  public id!: number;
  public userId!: number;
  public passwordResetShortCodeId!: number;
  public state!: string;
  public expireDate!: Date;

  public readonly passwordResetShortCode?: ShortCode | null;
  public getpasswordResetShortCode!: BelongsToGetAssociationMixin<ShortCode>;

  public readonly user?: User | null;
  public getUser!: BelongsToGetAssociationMixin<User>;

  public static associations: {
    passwordResetShortCode: Association<PasswordResetRequest, ShortCode>;
    user: Association<PasswordResetRequest, User>;
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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
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
