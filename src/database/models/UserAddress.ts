import { Association, BelongsToGetAssociationMixin, DataTypes } from 'sequelize';
import sequelize from '../sequelize';
import Address from './Address';
import User from './User';

class UserAddress extends Address {
  public readonly user?: User;
  public getUserAddress!: BelongsToGetAssociationMixin<User>;

  public static associations: {
    user: Association<UserAddress, User>;
  };
}

UserAddress.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
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

export default UserAddress;
