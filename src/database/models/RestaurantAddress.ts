import { DataTypes, Association, BelongsToGetAssociationMixin } from 'sequelize';
import sequelize from '../sequelize';
import Address from './Address';
import Restaurant from './Restaurant';

class RestaurantAddress extends Address {
  public nHood!: string;
  public street!: string;
  public no!: string;

  public readonly restaurant?: Restaurant;
  public getRestaurant!: BelongsToGetAssociationMixin<Restaurant>;

  public static associations: {
    restaurant: Association<RestaurantAddress, Restaurant>;
  };
}

RestaurantAddress.init(
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
    nHood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no: {
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

export default RestaurantAddress;
